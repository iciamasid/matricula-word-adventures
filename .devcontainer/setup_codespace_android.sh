#!/bin/bash
    set -e

    echo "=== Iniciando la configuración robusta del entorno Android en Codespaces ==="

    # 1. Configurar ANDROID_SDK_ROOT y PATH para las herramientas de línea de comandos
    export ANDROID_SDK_ROOT=/usr/local/lib/android/sdk
    mkdir -p $ANDROID_SDK_ROOT
    export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools
    echo "ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT"
    echo "PATH=$PATH"

    # 2. Forzar la instalación de cmdline-tools, platform-tools, y platform 34
    # Si vuelves a tener el error VANILLA_ICE_CREAM, cambia 'platforms;android-34' a 'platforms;android-35' aquí.
    echo "--- Instalando componentes del SDK de Android (platforms;android-34) ---"
    yes | sdkmanager --install 'platforms;android-34' 'build-tools;34.0.0' 'cmdline-tools;latest' 'platform-tools' 'patcher;v4' || { echo "ERROR: sdkmanager install failed."; exit 1; }

    # 3. Aceptar las licencias del SDK de Android
    echo "--- Aceptando licencias del SDK de Android ---"
    yes | sdkmanager --licenses || { echo "WARNING: License acceptance failed, but continuing."; }

    # 4. Obtener la ruta REAL de JAVA_HOME y escribirla en un gradle.properties a nivel raíz de Android
    echo "--- Configurando JAVA_HOME para Gradle ---"
    JAVAHOME_PATH=$(readlink -f $(dirname $(dirname $(which java))))
    echo "org.gradle.java.home=$JAVAHOME_PATH" > android/gradle.properties || { echo "ERROR: Could not write gradle.properties"; exit 1; }
    echo "org.gradle.java.home set to: $JAVAHOME_PATH"

    # 5. Asegurar que las variables.gradle estén en el lugar correcto (raíz del proyecto Android)
    echo "--- Copiando variables.gradle a la carpeta android ---"
    cp variables.gradle android/variables.gradle || { echo "ERROR: Could not copy variables.gradle"; exit 1; }

    # 6. Parchear android/build.gradle si es necesario (el de la raíz) - restaurar a estado limpio
    # Esto evita problemas de sintaxis con bloques 'java {}' o 'afterEvaluate' mal colocados
    echo "--- Restaurando android/build.gradle a la configuración estándar ---"
    cat > android/build.gradle << EOF_BUILD_GRADLE
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    ext {
        kotlin_version = '1.9.0' // O la versión que tengas
        gradlePluginVersion = '8.1.4' // O la versión que tengas (soporta API 34)
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:\$gradlePluginVersion"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:\$kotlin_version"
    }
}

// Cargar variables.gradle aquí para que las variables estén en rootProject.ext
apply from: 'variables.gradle'

allprojects {
    repositories {
        google()
        mavenCentral()
        flatDir {
            dirs 'libs'
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
EOF_BUILD_GRADLE
    
    # 7. Ejecutar npm install y npm run build (la parte web de tu app)
    echo "--- Instalando dependencias de npm ---"
    npm install --legacy-peer-deps || { echo "ERROR: npm install failed. Check logs above."; exit 1; }
    echo "--- Construyendo la aplicación web (npm run build) ---"
    npm run build || { echo "ERROR: npm run build failed. Check logs above."; exit 1; }

    # 8. Eliminar y re-añadir la plataforma Android para una limpieza total
    echo "--- Limpiando y re-añadiendo la plataforma Android ---"
    rm -rf android/app || true
    rm -rf android/capacitor-cordova-android-plugins || true
    rm -rf android/node_modules || true
    npx cap add android || { echo "ERROR: npx cap add android failed. Check logs above."; exit 1; }
    npx cap sync android || { echo "ERROR: npx cap sync android failed. Check logs above."; exit 1; }

    # 9. Navegar al directorio Android para los parches y comandos de Gradle
    echo "--- Navegando al directorio Android y configurando gradlew ---"
    cd android || { echo "ERROR: Could not change to android directory."; exit 1; }
    chmod +x gradlew || { echo "ERROR: Could not make gradlew executable."; exit 1; }
    
    # 10. Asegurar local.properties apunte al SDK de Android
    echo 'sdk.dir=/usr/local/lib/android/sdk' > local.properties || { echo "ERROR: Could not write local.properties."; exit 1; }

    # 11. *** PARCHES CRÍTICOS EN node_modules PARA JAVA 17 y DEPENDENCIAS ***
    # Estos se aplican DESPUÉS de 'cap add android' y 'cap sync android'
    # para que no sean sobrescritos inmediatamente.

    echo "--- Aplicando parches a node_modules para Java 17 ---"

    # PARCHE 1: capacitor-android/capacitor/build.gradle
    sed -i 's|sourceCompatibility JavaVersion.VERSION_1_8|sourceCompatibility JavaVersion.VERSION_17|g' node_modules/@capacitor/android/capacitor/build.gradle || true
    sed -i 's|targetCompatibility JavaVersion.VERSION_1_8|targetCompatibility JavaVersion.VERSION_17|g' node_modules/@capacitor/android/capacitor/build.gradle || true
    sed -i '/kotlinOptions {/,/}/d' node_modules/@capacitor/android/capacitor/build.gradle || true
    if ! grep -q "tasks.withType(JavaCompile).configureEach" node_modules/@capacitor/android/capacitor/build.gradle; then
      sed -i '/buildFeatures {/a \        tasks.withType(JavaCompile).configureEach { options.release.set(17) }' node_modules/@capacitor/android/capacitor/build.gradle || true
    fi

    # PARCHE 2: capacitor-community-admob/android/build.gradle
    sed -i 's|sourceCompatibility JavaVersion.VERSION_1_8|sourceCompatibility JavaVersion.VERSION_17|g' node_modules/@capacitor-community/admob/android/build.gradle || true
    sed -i 's|targetCompatibility JavaVersion.VERSION_1_8|targetCompatibility JavaVersion.VERSION_17|g' node_modules/@capacitor-community/admob/android/build.gradle || true
    sed -i '/npm install/d' node_modules/@capacitor-community/admob/android/build.gradle || true
    if ! grep -q "tasks.withType(JavaCompile).configureEach" node_modules/@capacitor-community/admob/android/build.gradle; then
      sed -i '/buildFeatures {/a \        tasks.withType(JavaCompile).configureEach { options.release.set(17) }' node_modules/@capacitor-community/admob/android/build.gradle || true
    fi

    # 12. Limpiar Gradle (esto ahora debería funcionar)
    echo "--- Limpiando proyecto Gradle ---"
    ./gradlew clean || { echo "ERROR: Gradle clean failed. Check logs above."; exit 1; }
    
    # 13. Generar el APK de depuración
    echo "--- Generando el APK de depuración ---"
    ./gradlew assembleDebug || { echo "ERROR: Gradle assembleDebug failed. Check logs above."; exit 1; }

    echo "=== Configuración y compilación completadas con éxito. ==="
    