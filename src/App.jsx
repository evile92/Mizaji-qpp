import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, RefreshCw, Calendar, Thermometer, Wind, Droplets, Navigation, Globe, Flame, CloudLightning, Sun, Moon, Map as MapIcon } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { initializeAdMob, showBannerAd, getWeatherMood, degreesToCompass } from './utils';
import { WeatherBackground, PersonalitySlider, MapModal, DailyCard, DetailMetric } from './components/WeatherUI';
import { MoodPersona } from './components/MoodPersona';

const App = () => {
  const [lang, setLang] = useState('en'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [personality, setPersonality] = useState('sarcastic'); 
  const [location, setLocation] = useState({ lat: null, lon: null, name: '' });
  const [activeLocationType, setActiveLocationType] = useState('current'); 
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); 

  // Language Toggle Logic (EN -> AR -> MA -> EN)
  const toggleLanguage = () => {
    setLang(prev => {
      if (prev === 'en') return 'ar';
      if (prev === 'ar') return 'ma'; // Moroccan Dialect
      return 'en';
    });
  };

  // Roast Button Logic with Sound
  const handleRoastClick = () => {
    setPersonality('roast');
    // Haptic Feedback
    if (navigator.vibrate) navigator.vibrate(200);
    // Sound Effect (Vine Boom)
    const audio = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play failed - interaction required"));
  };

  useEffect(() => {
    initializeAdMob();
    const timer = setTimeout(() => {
        showBannerAd();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ FIX 2: Location effect now updates name when language changes
  useEffect(() => {
    setLocation(prev => ({
      ...prev,
      // Only update name if it was previously a translated label (not a custom name)
      name: prev.lat ? TRANSLATIONS[lang].yourLocation : TRANSLATIONS[lang].detecting
    }));
  }, [lang]);

  useEffect(() => {
    const setDefaultLocation = () => {
      setLocation({ lat: 35.57, lon: -5.37, name: 'Tetouan (Default)' });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: TRANSLATIONS[lang].yourLocation
          });
        },
        (err) => {
          console.warn("Geolocation denied. Using default.");
          setDefaultLocation();
        }
      );
    } else {
      setDefaultLocation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ Run once on mount only - lang effect above handles name translation

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location.lat) return;

      setLoading(true);
      setError(null);
      
      try {
        const lat = activeLocationType === 'current' ? location.lat : location.lat + 0.05;
        const lon = activeLocationType === 'current' ? location.lon : location.lon + 0.05;

        // ✅ FIX 3: Added winddirection_10m to get real wind direction
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,winddirection_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=2&forecast_days=2&timezone=auto`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();
        if (data.error) throw new Error(data.reason);

        const dailyProcessed = data.daily.time.map((time, index) => ({
          time,
          code: data.daily.weather_code[index],
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
        }));

        setWeatherData({
          current: {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            // ✅ FIX 3: Store real wind direction degrees
            windDirection: data.current.winddirection_10m,
            code: data.current.weather_code
          },
          daily: dailyProcessed,
          timezone: data.timezone
        });
        
        setSelectedDayIndex(2);
        
      } catch (err) {
        console.error(err);
        setError(TRANSLATIONS[lang].fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, activeLocationType, lang]);

  const currentMood = useMemo(() => {
    if (!weatherData) return getWeatherMood(0, lang, isDarkMode, personality);
    return getWeatherMood(weatherData.daily[selectedDayIndex].code, lang, isDarkMode, personality);
  }, [weatherData, selectedDayIndex, lang, isDarkMode, personality]);

  const displayData = useMemo(() => {
    if (!weatherData) return null;
    const day = weatherData.daily[selectedDayIndex];
    const isToday = selectedDayIndex === 2;
    const yesterdayTemp = weatherData.daily[1]?.tempMax;

    return {
      temp: isToday ? weatherData.current.temp : day.tempMax,
      yesterdayTemp: yesterdayTemp,
      humidity: isToday ? weatherData.current.humidity : '-',
      wind: isToday ? weatherData.current.wind : '-',
      // ✅ FIX 3: Pass real wind direction, convert degrees to compass label
      windDirection: isToday ? degreesToCompass(weatherData.current.windDirection) : '-',
      conditionCode: day.code,
      date: day.time
    };
  }, [weatherData, selectedDayIndex]);

  if (error) return (
    <div className={`flex items-center justify-center h-screen p-8 text-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}>
      <div>
        <CloudLightning className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <h1 className="text-2xl font-bold mb-2">{TRANSLATIONS[lang].oops}</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={`mt-4 px-6 py-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-800 text-white'}`}>
          {TRANSLATIONS[lang].retry}
        </button>
      </div>
    </div>
  );

  return (
    <div dir={lang === 'en' ? 'ltr' : 'rtl'} className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-1000 ${currentMood.bg}`}>
      
      <WeatherBackground type={currentMood.type} isDarkMode={isDarkMode} personality={personality} />

      <div className="relative z-20 px-6 pt-6 flex items-center justify-between max-w-md mx-auto">
         <div className="flex gap-2">
           <button 
             onClick={toggleLanguage}
             className={`px-3 py-2 rounded-full backdrop-blur-md shadow-sm border transition-all flex items-center gap-1 ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-white' : 'bg-white/40 border-white/20 text-slate-800'}`}
             title="Switch Language"
           >
              <Globe size={16} />
              <span className="text-xs font-bold uppercase">{lang}</span>
           </button>
           
           <button 
             onClick={handleRoastClick}
             className="p-2 rounded-full backdrop-blur-md shadow-sm border transition-all bg-red-600 text-white border-red-500 hover:scale-110 hover:rotate-12 active:scale-95"
             title="Roast My Weather 🔥"
           >
              <Flame size={18} />
           </button>
         </div>

         <div className="flex gap-2">
            <button 
              onClick={() => setShowMap(true)}
              className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-white' : 'bg-white/40 border-white/20 text-slate-800'}`}
              title="Show Map"
            >
               <MapIcon size={18} />
            </button>
            <button 
              onClick={() => setIsDarkMode(prev => !prev)}
              className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-yellow-400' : 'bg-white/40 border-white/20 text-slate-800'}`}
              title="Toggle Theme"
            >
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
         </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col p-6 pt-4 pb-20">
        <header className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-white' : 'bg-white/40 border-white/20 text-slate-700'}`}>
            <MapPin size={16} className={personality === 'roast' ? 'text-red-500' : currentMood.text} />
            <span className="text-sm font-bold">
               {activeLocationType === 'current' ? (location.name || TRANSLATIONS[lang].yourLocation) : TRANSLATIONS[lang].nearby}
            </span>
          </div>
          
          <button 
            onClick={() => setActiveLocationType(prev => prev === 'current' ? 'nearby' : 'current')}
            className={`p-2 rounded-full transition-colors backdrop-blur-md shadow-sm border ${isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-700' : 'bg-white/40 border-white/20 hover:bg-white/60'}`}
            title="Switch Location"
          >
            <RefreshCw size={18} className={`transition-transform duration-500 ${isDarkMode ? 'text-white' : 'text-slate-800'} ${loading ? 'animate-spin' : ''}`} />
          </button>
        </header>

        <PersonalitySlider personality={personality} setPersonality={setPersonality} lang={lang} isDarkMode={isDarkMode} />

        {loading && !weatherData && (
          <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
            <div className={`w-32 h-32 rounded-full mb-8 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'}`}></div>
            <div className={`w-48 h-8 rounded mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300'}`}></div>
            <p className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}>{TRANSLATIONS[lang].loading}</p>
          </div>
        )}

        {!loading && weatherData && displayData && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center transition-all duration-500">
              <MoodPersona 
                mood={currentMood} 
                temp={displayData.temp} 
                yesterdayTemp={displayData.yesterdayTemp}
                isDarkMode={isDarkMode}
                personality={personality}
                lang={lang}
              />
              
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                 <DetailMetric icon={Thermometer} label={TRANSLATIONS[lang].feelsLike} value={Math.round(displayData.temp)} unit="°C" delay={100} isDarkMode={isDarkMode} lang={lang} personality={personality} />
                 <DetailMetric icon={Wind} label={TRANSLATIONS[lang].wind} value={displayData.wind !== '-' ? Math.round(displayData.wind) : '-'} unit={displayData.wind !== '-' ? "km/h" : ""} delay={200} isDarkMode={isDarkMode} lang={lang} personality={personality} />
                 <DetailMetric icon={Droplets} label={TRANSLATIONS[lang].humidity} value={displayData.humidity} unit="%" delay={300} isDarkMode={isDarkMode} lang={lang} personality={personality} />
                 {/* ✅ FIX 3: Real wind direction from API */}
                 <DetailMetric icon={Navigation} label={TRANSLATIONS[lang].direction} value={displayData.windDirection} unit="" delay={400} isDarkMode={isDarkMode} lang={lang} personality={personality} />
              </div>
            </div>

            <div className="mt-8 mb-4">
              <div className="flex items-center gap-2 mb-4 opacity-60 px-1">
                <Calendar size={14} className={isDarkMode ? 'text-white' : 'text-slate-800'} />
                <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{TRANSLATIONS[lang].timeline}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {weatherData.daily.map((day, idx) => {
                  const dayMood = getWeatherMood(day.code, lang, isDarkMode, personality);
                  return (
                    <DailyCard key={day.time} day={day} mood={dayMood} isSelected={selectedDayIndex === idx} onClick={() => setSelectedDayIndex(idx)} lang={lang} isDarkMode={isDarkMode} personality={personality} />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <MapModal isOpen={showMap} onClose={() => setShowMap(false)} lat={activeLocationType === 'current' ? location.lat : location.lat + 0.05} lon={activeLocationType === 'current' ? location.lon : location.lon + 0.05} title={TRANSLATIONS[lang].mapTitle} isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
