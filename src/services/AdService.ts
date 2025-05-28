
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, RewardAdOptions, AdmobConsentStatus, AdmobConsentInfo } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export interface AdConfig {
  bannerId: string;
  rewardedId: string;
  testMode: boolean;
}

export interface RewardedAdReward {
  type: string;
  amount: number;
}

export class AdService {
  private static instance: AdService;
  private config: AdConfig;
  private isInitialized = false;
  private isNativeApp = false;
  
  private constructor() {
    // Configuración de anuncios - IDs reales de producción
    this.config = {
      bannerId: 'ca-app-pub-4321448416977763/7672317288',
      rewardedId: 'ca-app-pub-4321448416977763/8398850253',
      testMode: false
    };
    
    // Detectar si estamos en una app nativa
    this.isNativeApp = Capacitor.isNativePlatform();
  }

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      if (!this.isNativeApp) {
        // Fallback para web - simulación
        console.log('AdService: Running in web mode, using simulation');
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isInitialized = true;
        return true;
      }

      console.log('AdService: Initializing AdMob for native app...');
      
      // Inicializar AdMob en modo nativo
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: this.config.testMode ? ['YOUR_DEVICE_ID'] : [],
        initializeForTesting: this.config.testMode
      });

      // Verificar el estado de consentimiento
      const consentInfo = await AdMob.requestConsentInfo();
      
      if (consentInfo.status === AdmobConsentStatus.REQUIRED) {
        await AdMob.showConsentForm();
      }

      this.isInitialized = true;
      console.log('AdService: AdMob initialized successfully for native app');
      return true;
    } catch (error) {
      console.error('AdService: Failed to initialize AdMob:', error);
      return false;
    }
  }

  async showBanner(position: 'top' | 'bottom' = 'bottom'): Promise<boolean> {
    if (!this.isInitialized) {
      console.log('AdService: Ads not initialized, skipping banner');
      return false;
    }

    if (!this.isNativeApp) {
      // Fallback para web
      console.log(`AdService: Showing simulated banner ad at ${position}`);
      return true;
    }

    try {
      const options: BannerAdOptions = {
        adId: this.config.bannerId,
        adSize: BannerAdSize.BANNER,
        position: position === 'top' ? BannerAdPosition.TOP_CENTER : BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: this.config.testMode
      };

      await AdMob.showBanner(options);
      console.log(`AdService: Showing real banner ad at ${position}`);
      return true;
    } catch (error) {
      console.error('AdService: Failed to show banner:', error);
      return false;
    }
  }

  async hideBanner(): Promise<boolean> {
    if (!this.isNativeApp) {
      console.log('AdService: Hiding simulated banner ad');
      return true;
    }

    try {
      await AdMob.hideBanner();
      console.log('AdService: Hiding real banner ad');
      return true;
    } catch (error) {
      console.error('AdService: Failed to hide banner:', error);
      return false;
    }
  }

  async showRewardedAd(): Promise<RewardedAdReward | null> {
    if (!this.isInitialized) {
      console.log('AdService: Ads not initialized, skipping rewarded ad');
      return null;
    }

    if (!this.isNativeApp) {
      // Fallback para web - simulación
      console.log('AdService: Loading simulated rewarded ad...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('AdService: Showing simulated rewarded ad');
      await new Promise(resolve => setTimeout(resolve, 3000)); // Anuncio más corto para testing
      
      const reward: RewardedAdReward = {
        type: 'points',
        amount: Math.floor(Math.random() * 50) + 25
      };
      
      console.log('AdService: Simulated rewarded ad completed, reward:', reward);
      return reward;
    }

    try {
      const options: RewardAdOptions = {
        adId: this.config.rewardedId,
        isTesting: this.config.testMode
      };

      console.log('AdService: Loading real rewarded ad...');
      await AdMob.prepareRewardVideoAd(options);
      
      console.log('AdService: Showing real rewarded ad');
      const result = await AdMob.showRewardVideoAd();
      
      if (result.rewarded) {
        const reward: RewardedAdReward = {
          type: result.type || 'points',
          amount: result.amount || 50
        };
        
        console.log('AdService: Real rewarded ad completed, reward:', reward);
        return reward;
      } else {
        console.log('AdService: Rewarded ad was not completed');
        return null;
      }
    } catch (error) {
      console.error('AdService: Failed to show rewarded ad:', error);
      return null;
    }
  }

  async isRewardedAdReady(): Promise<boolean> {
    if (!this.isInitialized) return false;
    
    if (!this.isNativeApp) {
      // Simulación para web
      return Math.random() > 0.1;
    }
    
    try {
      // En apps nativas, siempre intentamos cargar el anuncio
      return true;
    } catch (error) {
      console.error('AdService: Error checking rewarded ad availability:', error);
      return false;
    }
  }

  getConfig(): AdConfig {
    return { ...this.config };
  }

  setTestMode(enabled: boolean): void {
    this.config.testMode = enabled;
    console.log(`AdService: Test mode ${enabled ? 'enabled' : 'disabled'}`);
  }

  isRunningNatively(): boolean {
    return this.isNativeApp;
  }
}

export const adService = AdService.getInstance();
