import React, { useState, useEffect, useCallback } from 'react';
import { CloudLightning } from 'lucide-react';
import { TRANSLATIONS } from './constants/translations';
import { useLocation } from './hooks/useLocation';
import { useWeather } from './hooks/useWeather';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import { useSoundEffects } from './hooks/useSoundEffects';

// Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { WeatherAtmosphere } from './components/weather/WeatherAtmosphere';
import { HeroWeather } from './components/weather/HeroWeather';
import { WeatherMetricsGrid } from './components/weather/WeatherMetricsGrid';
import { HourlyForecastList } from './components/weather/HourlyForecastList';
import { DailyForecastGrid } from './components/weather/DailyForecastGrid';
import { PrayerTimesView } from './components/prayer/PrayerTimesView';
import { LocationSearchModal } from './components/location/LocationSearchModal';
import { WeatherMapModal } from './components/map/WeatherMapModal';
import { ShareCardModal } from './components/share/ShareCardModal';

const App = () => {
  // ── Global Preferences ───────────────────────────────────────────────────
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mizaji_lang') || 'ar';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('mizaji_theme');
    if (saved) return saved === 'dark';
    return true; // Default to sleek dark mode
  });

  const [personality, setPersonality] = useState('sarcastic'); // 'calm' | 'sarcastic' | 'roast'
  const [activeTab, setActiveTab] = useState('weather'); // 'weather' | 'prayer'

  // Modals
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Sound Engine
  const { playRoastSound, playTapSound } = useSoundEffects();

  // Location Hook
  const {
    location,
    displayName: locationDisplayName,
    isGpsActive,
    detectGpsLocation,
    selectCity,
    searchCities,
    searchResults,
    isSearching,
    popularCities,
  } = useLocation(lang);

  // Weather Hook
  const {
    weatherData,
    activeDayData,
    currentMood,
    selectedDayHourly,
    selectedDayIndex,
    setSelectedDayIndex,
    loading: weatherLoading,
    error: weatherError,
    refreshWeather,
    shuffleRoastQuote,
  } = useWeather(location.lat, location.lon, lang, isDarkMode, personality);

  // Prayer Times Hook
  const {
    prayers,
    hijri,
    nextPrayerInfo,
    qiblaAngle,
    loading: prayerLoading,
    error: prayerError,
    calcMethod,
    setCalcMethod,
    refreshPrayers,
  } = usePrayerTimes(location.lat, location.lon, lang);

  // Sync Dark Mode class on <html> & <meta name="theme-color">
  useEffect(() => {
    const metaTheme = document.getElementById('theme-color-meta') || document.querySelector('meta[name="theme-color"]');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mizaji_theme', 'dark');
      if (metaTheme) {
        metaTheme.setAttribute('content', personality === 'roast' ? '#180404' : '#070a13');
      }
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mizaji_theme', 'light');
      if (metaTheme) {
        metaTheme.setAttribute('content', personality === 'roast' ? '#180404' : '#f8fafc');
      }
    }
  }, [isDarkMode, personality]);

  // Sync Language
  useEffect(() => {
    localStorage.setItem('mizaji_lang', lang);
  }, [lang]);

  // Language toggle cycle (AR -> MA -> EN -> AR)
  const handleToggleLang = useCallback(() => {
    playTapSound();
    setLang((prev) => (prev === 'ar' ? 'ma' : prev === 'ma' ? 'en' : 'ar'));
  }, [playTapSound]);

  // Dark mode toggle
  const handleToggleDarkMode = useCallback(() => {
    playTapSound();
    setIsDarkMode((prev) => !prev);
  }, [playTapSound]);

  // Roast Mode Trigger
  const handleTriggerRoast = useCallback(() => {
    playRoastSound();
    setPersonality('roast');
    shuffleRoastQuote();
  }, [playRoastSound, shuffleRoastQuote]);

  // Personality Change
  const handleChangePersonality = useCallback((newP) => {
    if (newP === 'roast') {
      playRoastSound();
    } else {
      playTapSound();
    }
    setPersonality(newP);
  }, [playRoastSound, playTapSound]);

  // Refresh All Data
  const handleRefreshAll = useCallback(() => {
    playTapSound();
    refreshWeather();
    refreshPrayers();
  }, [playTapSound, refreshWeather, refreshPrayers]);

  const isRtl = lang === 'ar' || lang === 'ma';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Critical Error Screen
  if (weatherError && !weatherData) {
    return (
      <div 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className={`flex items-center justify-center min-h-screen p-6 text-center ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}
      >
        <div className="max-w-sm flex flex-col items-center">
          <CloudLightning className="w-16 h-16 mb-4 text-rose-500 animate-bounce-slow" />
          <h1 className="text-xl font-black mb-2">{t.oops}</h1>
          <p className="text-xs font-semibold opacity-75 mb-5">{weatherError}</p>
          <button 
            onClick={handleRefreshAll}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg transition-transform active:scale-95"
          >
            {t.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-700 select-none ${currentMood.bg} ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}
    >
      {/* Dynamic Animated Background Atmosphere */}
      <WeatherAtmosphere 
        type={currentMood.type} 
        isDarkMode={isDarkMode} 
        personality={personality} 
      />

      {/* Top Header Bar */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        personality={personality}
        onTriggerRoast={handleTriggerRoast}
        locationDisplayName={locationDisplayName}
        isGpsActive={isGpsActive}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenMap={() => setShowMapModal(true)}
        onOpenShare={() => setShowShareModal(true)}
        onRefresh={handleRefreshAll}
        isLoading={weatherLoading || prayerLoading}
      />

      {/* Main Tab Content */}
      <main className="relative z-10 w-full max-w-lg mx-auto pb-24">
        {activeTab === 'weather' && (
          <div className="flex flex-col items-center px-4 animate-in fade-in duration-300">
            {/* Loading Skeleton if no data yet */}
            {weatherLoading && !activeDayData ? (
              <div className="w-full flex flex-col items-center justify-center py-20 animate-pulse">
                <div className={`w-32 h-32 rounded-3xl mb-6 ${isDarkMode ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
                <div className={`w-44 h-12 rounded-2xl mb-4 ${isDarkMode ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
                <div className={`w-64 h-6 rounded-xl ${isDarkMode ? 'bg-slate-800/80' : 'bg-slate-200'}`} />
              </div>
            ) : activeDayData ? (
              <>
                {/* Hero Weather Section */}
                <HeroWeather
                  mood={currentMood}
                  activeData={activeDayData}
                  personality={personality}
                  onChangePersonality={handleChangePersonality}
                  onShuffleRoast={shuffleRoastQuote}
                  lang={lang}
                  isDarkMode={isDarkMode}
                  onTapEffect={playTapSound}
                />

                {/* 24-Hour Hourly Forecast for Selected Day */}
                <HourlyForecastList
                  hourlyData={selectedDayHourly}
                  isToday={activeDayData.isToday}
                  lang={lang}
                  isDarkMode={isDarkMode}
                  personality={personality}
                />

                {/* 7-Day Timeline Forecast Grid */}
                {weatherData?.daily && (
                  <DailyForecastGrid
                    dailyData={weatherData.daily}
                    selectedDayIndex={selectedDayIndex}
                    onSelectDay={(idx) => {
                      playTapSound();
                      setSelectedDayIndex(idx);
                    }}
                    lang={lang}
                    isDarkMode={isDarkMode}
                    personality={personality}
                  />
                )}

                {/* Detailed 6-Card Metrics Grid */}
                <WeatherMetricsGrid
                  activeData={activeDayData}
                  lang={lang}
                  isDarkMode={isDarkMode}
                  personality={personality}
                />
              </>
            ) : null}
          </div>
        )}

        {/* Prayer Times Tab Content */}
        {activeTab === 'prayer' && (
          <PrayerTimesView
            prayers={prayers}
            hijri={hijri}
            nextPrayerInfo={nextPrayerInfo}
            qiblaAngle={qiblaAngle}
            locationName={locationDisplayName}
            loading={prayerLoading}
            error={prayerError}
            calcMethod={calcMethod}
            onChangeCalcMethod={setCalcMethod}
            onRefresh={refreshPrayers}
            lang={lang}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          playTapSound();
          setActiveTab(tab);
        }}
        lang={lang}
        isDarkMode={isDarkMode}
        personality={personality}
      />

      {/* City Search Modal */}
      <LocationSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectCity={(city) => {
          selectCity(city);
          playTapSound();
        }}
        onUseGps={detectGpsLocation}
        onSearch={searchCities}
        searchResults={searchResults}
        isSearching={isSearching}
        popularCities={popularCities}
        lang={lang}
        isDarkMode={isDarkMode}
      />

      {/* Radar Map Modal */}
      <WeatherMapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        lat={location.lat}
        lon={location.lon}
        locationName={locationDisplayName}
        lang={lang}
        isDarkMode={isDarkMode}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        mood={currentMood}
        activeData={activeDayData}
        locationName={locationDisplayName}
        lang={lang}
        personality={personality}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;
