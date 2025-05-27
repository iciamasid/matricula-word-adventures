
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
  
  private constructor() {
    // Configuración de anuncios (IDs de prueba para desarrollo)
    this.config = {
      bannerId: 'ca-app-pub-4321448416977763/7672317288', // Test banner ID
      rewardedId: 'ca-app-pub-4321448416977763/8398850253', // Test rewarded ID
      testMode: false
    };
  }

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService();
    }
    return AdService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      // En producción, aquí se inicializaría AdMob
      // Para el prototipo, simulamos la inicialización
      console.log('AdService: Initializing ads...');
      
      // Simular tiempo de inicialización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isInitialized = true;
      console.log('AdService: Ads initialized successfully');
      return true;
    } catch (error) {
      console.error('AdService: Failed to initialize ads:', error);
      return false;
    }
  }

  async showBanner(position: 'top' | 'bottom' = 'bottom'): Promise<boolean> {
    if (!this.isInitialized) {
      console.log('AdService: Ads not initialized, skipping banner');
      return false;
    }

    try {
      console.log(`AdService: Showing banner ad at ${position}`);
      // En producción, aquí se mostraría el banner real
      return true;
    } catch (error) {
      console.error('AdService: Failed to show banner:', error);
      return false;
    }
  }

  async hideBanner(): Promise<boolean> {
    try {
      console.log('AdService: Hiding banner ad');
      // En producción, aquí se ocultaría el banner
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

    try {
      console.log('AdService: Loading rewarded ad...');
      
      // Simular carga del anuncio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('AdService: Showing rewarded ad');
      
      // Simular visualización del anuncio
      await new Promise(resolve => setTimeout(resolve, 30000)); // 30 segundos de anuncio
      
      // Simular recompensa ganada
      const reward: RewardedAdReward = {
        type: 'points',
        amount: Math.floor(Math.random() * 50) + 25 // 25-75 puntos
      };
      
      console.log('AdService: Rewarded ad completed, reward:', reward);
      return reward;
    } catch (error) {
      console.error('AdService: Failed to show rewarded ad:', error);
      return null;
    }
  }

  async isRewardedAdReady(): Promise<boolean> {
    if (!this.isInitialized) return false;
    
    // Simular disponibilidad del anuncio
    return Math.random() > 0.1; // 90% de probabilidad de estar disponible
  }

  getConfig(): AdConfig {
    return { ...this.config };
  }

  setTestMode(enabled: boolean): void {
    this.config.testMode = enabled;
    console.log(`AdService: Test mode ${enabled ? 'enabled' : 'disabled'}`);
  }
}

export const adService = AdService.getInstance();
