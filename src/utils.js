export * from './utils/weatherHelpers';
export * from './utils/prayerHelpers';

// AdMob stubs for web/PWA
export const initializeAdMob = async () => {
  try {
    // Web environment: AdMob stub
  } catch (e) {
    console.error('AdMob Init Error:', e);
  }
};

export const showBannerAd = async () => {
  try {
    // Web environment: Banner stub
  } catch (e) {
    console.error('Banner Ad Error:', e);
  }
};
