import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, 
  MapPin, RefreshCw, Calendar, Thermometer, Navigation,
  CloudFog, Snowflake, Moon, Globe, Map as MapIcon, X,
  Glasses, Flame, Smile, Meh
} from 'lucide-react';

// Note: In a real environment, you would import this:
// import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';

/**
 * ADMOB CONFIGURATION
 * إعدادات إعلانات أدموب
 */
const initializeAdMob = async () => {
  // This code runs only on a native device (iOS/Android) via Capacitor
  // هذا الكود يعمل فقط عند تشغيل التطبيق على الهاتف باستخدام كاباسيتور
  try {
    // const { status } = await AdMob.trackingAuthorizationStatus();
    // await AdMob.initialize({
    //   requestTrackingAuthorization: true,
    //   testingDevices: ['YOUR_TEST_DEVICE_ID'],
    //   initializeForTesting: true,
    // });
    console.log('AdMob Initialized');
  } catch (e) {
    console.error('AdMob Init Error:', e);
  }
};

const showBannerAd = async () => {
  try {
    // const options = {
    //   adId: 'ca-app-pub-xxxxxxxx/xxxxxxxx', // Replace with your Banner ID
    //   adSize: BannerAdSize.BANNER,
    //   position: BannerAdPosition.BOTTOM_CENTER,
    //   margin: 0,
    //   isTesting: true // Set to false in production | اجعلها خطأ عند النشر
    // };
    // await AdMob.showBanner(options);
  } catch (e) {
    console.error('Banner Ad Error:', e);
  }
};

// ... [Keep all previous TRANSLATIONS and helper functions exactly as they were] ...
// ... [إبقاء جميع الثوابت ودوال الترجمة السابقة كما هي تماماً] ...

const TRANSLATIONS = {
    en: {
      detecting: 'Detecting...',
      yourLocation: 'Your Location',
      nearby: 'Nearby Location',
      retry: 'Retry',
      oops: 'Oops.',
      timeline: 'TIMELINE',
      feelsLike: 'Feels Like',
      wind: 'Wind',
      humidity: 'Humidity',
      direction: 'Direction',
      mapTitle: 'Weather Map',
      close: 'Close',
      today: 'Today',
      tomorrow: 'Tomorrow',
      yesterday: 'Yesterday',
      daysAgo: '2 Days Ago',
      loading: 'Loading Weather...',
      fetchError: 'Failed to fetch weather data.',
      geoError: 'Geolocation denied. Using default.',
      memory: {
        warmer: "Warmer than yesterday.",
        colder: "Colder than yesterday.",
        same: "Same old, same old.",
        roast_warmer: "At least it's not the ice age like yesterday.",
        roast_colder: "Yesterday was hot, today is a fridge. Make up your mind, nature.",
        roast_same: "Copy-paste weather. How original."
      },
      personalities: {
        calm: "Calm",
        sarcastic: "Sarcastic",
        roast: "Roast"
      },
      moods: {
        sunny: {
          label: 'Clear Sky',
          calm: { quote: "A bright and sunny day outside.", advice: "Great day for a walk." },
          sarcastic: { quote: "It's disgusting how cheerful it is outside. Go touch grass.", advice: "Wear sunglasses. Glare is real." },
          roast: { quote: "The sun is actively trying to cook you alive.", advice: "Stay inside or become bacon." }
        },
        cloudy: {
          label: 'Cloudy',
          calm: { quote: "A bit cloudy, but pleasant.", advice: "Good weather for reading." },
          sarcastic: { quote: "Mediocre weather for a mediocre day.", advice: "Perfect lighting for sad selfies." },
          roast: { quote: " The sky is gray, just like your future.", advice: "Don't bother looking up." }
        },
        foggy: {
          label: 'Foggy',
          calm: { quote: "Visibility is low due to fog.", advice: "Drive carefully." },
          sarcastic: { quote: "I can't see anything. Maybe that's for the best.", advice: "The world is buffering." },
          roast: { quote: "You finally have an excuse for being lost in life.", advice: "Watch your step, genius." }
        },
        rainy: {
          label: 'Rain',
          calm: { quote: "It's raining. Nature is watering the plants.", advice: "Don't forget your umbrella." },
          sarcastic: { quote: "The sky is crying. Great excuse to rot in bed.", advice: "Umbrella required. Obviously." },
          roast: { quote: "Even the sky is sad to see you today.", advice: "You'll melt if you go out. Oh wait, you're not sugar." }
        },
        snowy: {
          label: 'Snow',
          calm: { quote: "Snow is falling. Very picturesque.", advice: "Stay warm and cozy." },
          sarcastic: { quote: "Everything is frozen. Including my will to live.", advice: "Layers. Like an onion." },
          roast: { quote: "Elsa is having a mental breakdown again.", advice: "Don't eat yellow snow. I shouldn't have to tell you this." }
        },
        stormy: {
          label: 'Storm',
          calm: { quote: "Stormy conditions reported.", advice: "Safety first, stay indoors." },
          sarcastic: { quote: "The world is ending. Finally, some excitement.", advice: "Zeus is throwing a tantrum." },
          roast: { quote: "Nature is screaming at you.", advice: "Hide. Just hide." }
        },
        unknown: {
          label: 'Unknown',
          calm: { quote: "Weather status unknown.", advice: "Check back later." },
          sarcastic: { quote: "I have no idea what's happening.", advice: "Good luck." },
          roast: { quote: "I gave up trying to guess.", advice: "You figure it out." }
        }
      }
    },
    ar: {
      detecting: 'جاري الكشف...',
      yourLocation: 'موقعك الحالي',
      nearby: 'منطقة قريبة',
      retry: 'أعد المحاولة',
      oops: 'عفواً',
      timeline: 'الجدول الزمني',
      feelsLike: 'الإحساس الفعلي',
      wind: 'الرياح',
      humidity: 'الرطوبة',
      direction: 'الاتجاه',
      mapTitle: 'خريطة الطقس',
      close: 'إغلاق',
      today: 'اليوم',
      tomorrow: 'غداً',
      yesterday: 'أمس',
      daysAgo: 'قبل يومين',
      loading: 'جاري تحميل الطقس...',
      fetchError: 'فشل جلب بيانات الطقس.',
      geoError: 'تم رفض تحديد الموقع. استخدام الافتراضي.',
      memory: {
        warmer: "أدفأ من طقس الأمس.",
        colder: "أبرد من طقس الأمس.",
        same: "نفس الطقس المعتاد.",
        roast_warmer: "على الأقل ليس عصراً جليدياً مثل الأمس.",
        roast_colder: "أمس كان حراً واليوم ثلاجة. الطبيعة تعاني من تقلب مزاجي.",
        roast_same: "طقس بنسخ ولصق. يا له من إبداع."
      },
      personalities: {
        calm: "هادئ",
        sarcastic: "ساخر",
        roast: "لاذع"
      },
      moods: {
        sunny: {
          label: 'سماء صافية',
          calm: { quote: "يوم مشمس وجميل في الخارج.", advice: "يوم رائع للمشي." },
          sarcastic: { quote: "الجو مبهج لدرجة تثير الاشمئزاز. اخرج وتنفس قليلاً.", advice: "ارتدِ نظارة شمسية. السطوع حقيقي." },
          roast: { quote: "الشمس تحاول شواءك حياً اليوم.", advice: "ابق بالداخل وإلا ستصبح لحماً مقدداً." }
        },
        cloudy: {
          label: 'غائم',
          calm: { quote: "الجو غائم قليلاً، لكنه لطيف.", advice: "طقس جيد للقراءة." },
          sarcastic: { quote: "طقس متوسط ليوم متوسط.", advice: "إضاءة مثالية لصور السيلفي الكئيبة." },
          roast: { quote: "السماء رمادية، تماماً مثل مستقبلك.", advice: "لا تكلف نفسك عناء النظر للأعلى." }
        },
        foggy: {
          label: 'ضبابي',
          calm: { quote: "الرؤية منخفضة بسبب الضباب.", advice: "قد بحذر." },
          sarcastic: { quote: "لا أستطيع رؤية شيء. ربما هذا للأفضل.", advice: "العالم قيد التحميل." },
          roast: { quote: "وأخيراً لديك عذر لكونك ضائعاً في الحياة.", advice: "انتبه لخطواتك يا عبقري." }
        },
        rainy: {
          label: 'ماطر',
          calm: { quote: "إنها تمطر. الطبيعة تسقي النباتات.", advice: "لا تنس مظلتك." },
          sarcastic: { quote: "السماء تبكي. عذر ممتاز للبقاء في السرير.", advice: "المظلة ضرورية. بديهياً." },
          roast: { quote: "حتى السماء حزينة لرؤيتك اليوم.", advice: "ستذوب إذا خرجت... أوه انتظر، أنت لست قطعة سكر." }
        },
        snowy: {
          label: 'مثلج',
          calm: { quote: "الثلوج تتساقط. منظر خلاب.", advice: "ابق دافئاً ومستريحاً." },
          sarcastic: { quote: "كل شيء متجمد. بما في ذلك رغبتي في العمل.", advice: "ارتدِ طبقات. مثل البصلة." },
          roast: { quote: "يبدو أن (إلسا) تعاني من انهيار عصبي مجدداً.", advice: "لا تأكل الثلج الأصفر. لا يجب أن أخبرك بهذا." }
        },
        stormy: {
          label: 'عاصف',
          calm: { quote: "حالة عاصفة. ابق آمناً.", advice: "السلامة أولاً، ابق بالداخل." },
          sarcastic: { quote: "العالم ينتهي. أخيراً، بعض الإثارة.", advice: "الطبيعة غاضبة جداً اليوم." },
        roast: { quote: "الطبيعة تصرخ في وجهك.", advice: "اختبئ. فقط اختبئ." }
      },
      unknown: {
        label: 'غير معروف',
        calm: { quote: "حالة الطقس غير معروفة.", advice: "تحقق لاحقاً." },
        sarcastic: { quote: "ليس لدي أي فكرة عما يحدث.", advice: "حظاً موفقاً." },
        roast: { quote: "لقد استسلمت عن المحاولة.", advice: "دبر نفسك." }
      }
    }
  }
};

const getThemeColors = (type, isDarkMode, isRoastMode) => {
  if (isRoastMode) {
    return { bg: 'bg-red-950', text: 'text-red-500', accent: 'bg-red-800', gradient: 'from-orange-700 to-red-900' };
  }
  if (isDarkMode) {
    switch (type) {
      case 'sunny': return { bg: 'bg-slate-900', text: 'text-yellow-400', accent: 'bg-yellow-600', gradient: 'from-slate-800 to-slate-900' };
      case 'cloudy': return { bg: 'bg-slate-900', text: 'text-slate-400', accent: 'bg-slate-700', gradient: 'from-slate-800 to-slate-900' };
      case 'rainy': return { bg: 'bg-slate-900', text: 'text-blue-400', accent: 'bg-blue-900', gradient: 'from-slate-800 to-slate-900' };
      case 'stormy': return { bg: 'bg-slate-950', text: 'text-purple-400', accent: 'bg-purple-900', gradient: 'from-slate-900 to-black' };
      case 'snowy': return { bg: 'bg-slate-900', text: 'text-cyan-400', accent: 'bg-cyan-900', gradient: 'from-slate-800 to-slate-900' };
      default: return { bg: 'bg-slate-900', text: 'text-gray-400', accent: 'bg-gray-800', gradient: 'from-slate-800 to-slate-900' };
    }
  } else {
    switch (type) {
      case 'sunny': return { bg: 'bg-orange-50', text: 'text-orange-900', accent: 'bg-orange-500', gradient: 'from-yellow-400 to-orange-500' };
      case 'cloudy': return { bg: 'bg-slate-50', text: 'text-slate-800', accent: 'bg-slate-500', gradient: 'from-slate-300 to-slate-500' };
      case 'foggy': return { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-500', gradient: 'from-gray-200 to-gray-400' };
      case 'rainy': return { bg: 'bg-blue-50', text: 'text-blue-900', accent: 'bg-blue-600', gradient: 'from-blue-400 to-indigo-600' };
      case 'stormy': return { bg: 'bg-purple-50', text: 'text-purple-900', accent: 'bg-purple-800', gradient: 'from-purple-600 to-gray-900' };
      case 'snowy': return { bg: 'bg-cyan-50', text: 'text-cyan-900', accent: 'bg-cyan-600', gradient: 'from-cyan-100 to-blue-300' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', accent: 'bg-gray-500', gradient: 'from-gray-300 to-gray-500' };
    }
  }
};

const getWeatherMood = (code, lang, isDarkMode, personality) => {
  const t = TRANSLATIONS[lang].moods;
  let moodData = {};

  if (code === 0) moodData = { type: 'sunny', icon: Sun, ...t.sunny };
  else if ([1, 2, 3].includes(code)) moodData = { type: 'cloudy', icon: Cloud, ...t.cloudy };
  else if ([45, 48].includes(code)) moodData = { type: 'foggy', icon: CloudFog, ...t.foggy };
  else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) moodData = { type: 'rainy', icon: CloudRain, ...t.rainy };
  else if ([71, 73, 75, 77, 85, 86].includes(code)) moodData = { type: 'snowy', icon: Snowflake, ...t.snowy };
  else if ([95, 96, 99].includes(code)) moodData = { type: 'stormy', icon: CloudLightning, ...t.stormy };
  else moodData = { type: 'unknown', icon: Cloud, ...t.unknown };

  const colors = getThemeColors(moodData.type, isDarkMode, personality === 'roast');
  const personalityContent = moodData[personality] || moodData.sarcastic;
  
  return { ...moodData, ...colors, quote: personalityContent.quote, advice: personalityContent.advice };
};

const formatDate = (isoDate, lang) => {
  const t = TRANSLATIONS[lang];
  const d = new Date(isoDate);
  const today = new Date();
  
  const dSet = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const tSet = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = dSet - tSet;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return t.today;
  if (diffDays === 1) return t.tomorrow;
  if (diffDays === -1) return t.yesterday;
  if (diffDays === -2) return t.daysAgo;
  
  return d.toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

// ... [Components: PersonalitySlider, WeatherBackground, MapModal, DailyCard, DetailMetric, MemoryMood, MoodPersona - Keep all as is]
// ... [إبقاء جميع المكونات السابقة كما هي]

const PersonalitySlider = ({ personality, setPersonality, lang, isDarkMode }) => {
  const t = TRANSLATIONS[lang].personalities;
  const steps = [
    { id: 'calm', label: t.calm, icon: Smile },
    { id: 'sarcastic', label: t.sarcastic, icon: Meh },
    { id: 'roast', label: t.roast, icon: Flame }
  ];

  return (
    <div className={`flex items-center justify-between p-1 rounded-full border mb-6 backdrop-blur-md ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/40 border-white/20'}`}>
      {steps.map((step) => {
        const isActive = personality === step.id;
        const Icon = step.icon;
        return (
          <button
            key={step.id}
            onClick={() => setPersonality(step.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 rounded-full transition-all duration-300
              ${isActive 
                ? (step.id === 'roast' ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-slate-800 text-white shadow-lg') 
                : (isDarkMode ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-white/50')
              }
            `}
          >
            <Icon size={16} />
            <span className="text-xs font-bold hidden sm:inline">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const WeatherBackground = ({ type, isDarkMode, personality }) => {
  const opacity = isDarkMode ? 'opacity-10' : 'opacity-30';
  const isRoast = personality === 'roast';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-1000">
      {isRoast && (
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-transparent animate-pulse-slow z-0"></div>
      )}
      {type === 'sunny' && (
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${isRoast ? 'bg-red-500' : (isDarkMode ? 'bg-yellow-600' : 'bg-yellow-300')} rounded-full blur-[100px] ${opacity} animate-pulse-slow`}></div>
      )}
      {type === 'cloudy' && (
        <>
          <div className={`absolute top-[10%] left-[-10%] w-[300px] h-[300px] ${isRoast ? 'bg-red-900' : 'bg-gray-400'} rounded-full blur-[80px] ${opacity} animate-float`}></div>
          <div className={`absolute top-[40%] right-[-20%] w-[400px] h-[400px] bg-slate-400 rounded-full blur-[100px] opacity-20 animate-float-delayed`}></div>
        </>
      )}
      {type === 'rainy' && (
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-rain"></div>
      )}
      {type === 'stormy' && (
        <div className="absolute inset-0 bg-black opacity-10 animate-flash"></div>
      )}
    </div>
  );
};

const MapModal = ({ isOpen, onClose, lat, lon, title, isDarkMode }) => {
  if (!isOpen) return null;
  const mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className={`relative w-full max-w-2xl h-[500px] rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/40 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className={`absolute top-4 left-4 z-10 px-4 py-2 rounded-full font-bold backdrop-blur-md ${isDarkMode ? 'bg-slate-900/80 text-white' : 'bg-white/80 text-slate-800'}`}>
          {title}
        </div>
        <iframe title="Weather Map" width="100%" height="100%" src={mapUrl} frameBorder="0" className="w-full h-full"></iframe>
      </div>
    </div>
  );
};

const DailyCard = ({ day, mood, isSelected, onClick, lang, isDarkMode, personality }) => {
  const Icon = mood.icon;
  const isAr = lang === 'ar';
  const isRoast = personality === 'roast';
  
  return (
    <button 
      onClick={onClick}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`relative flex flex-col items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isSelected ? `${isRoast ? 'bg-red-900/80 ring-red-500' : (isDarkMode ? 'bg-slate-700 ring-slate-500' : 'bg-white ring-' + mood.text.split('-')[1] + '-300')} shadow-lg scale-105 ring-2` : `${isDarkMode ? 'bg-slate-800/40 hover:bg-slate-800/60' : 'bg-white/40 hover:bg-white/60'} hover:scale-105 border border-white/10`}`}
    >
      <span className={`text-xs font-bold uppercase tracking-wider opacity-70 mb-2 ${isRoast ? 'text-red-300' : (isDarkMode ? 'text-slate-300' : 'text-slate-600')}`}>
        {formatDate(day.time, lang)}
      </span>
      <Icon className={`w-8 h-8 mb-2 ${isRoast ? 'text-red-400' : mood.text}`} />
      <span className={`text-lg font-bold ${isRoast ? 'text-white' : (isDarkMode ? 'text-white' : 'text-slate-800')}`}>
        {Math.round(day.tempMax)}°
      </span>
      <span className={`text-xs opacity-60 ${isRoast ? 'text-red-200' : (isDarkMode ? 'text-slate-400' : 'text-slate-600')}`}>
        {Math.round(day.tempMin)}°
      </span>
    </button>
  );
};

const DetailMetric = ({ icon: Icon, label, value, unit, delay, isDarkMode, lang, personality }) => {
  const isRoast = personality === 'roast';
  return (
    <div 
      className={`backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 border transition-colors ${isRoast ? 'bg-red-950/40 border-red-900/50 hover:bg-red-900/40' : (isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/60' : 'bg-white/40 border-white/20 hover:bg-white/60')}`}
      style={{ animationDelay: `${delay}ms` }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className={`p-2 rounded-full shadow-sm ${isRoast ? 'bg-red-900 text-red-200' : (isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-600')}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className={`text-xs uppercase font-bold tracking-wider ${isRoast ? 'text-red-400' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>{label}</p>
        <div className="flex items-baseline gap-1">
          <p className={`text-lg font-semibold ${isRoast ? 'text-white' : (isDarkMode ? 'text-white' : 'text-slate-800')}`}>{value}</p>
          <span className={`text-sm font-normal ${isRoast ? 'text-red-300' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

const MemoryMood = ({ currentTemp, yesterdayTemp, lang, personality, isDarkMode }) => {
  if (!yesterdayTemp) return null;
  const t = TRANSLATIONS[lang].memory;
  const diff = currentTemp - yesterdayTemp;
  const isRoast = personality === 'roast';
  
  let message = "";
  if (Math.abs(diff) < 2) message = isRoast ? t.roast_same : t.same;
  else if (diff > 0) message = isRoast ? t.roast_warmer : t.warmer;
  else message = isRoast ? t.roast_colder : t.colder;

  return (
    <div className={`mt-2 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${isRoast ? 'text-red-400' : (isDarkMode ? 'text-slate-400' : 'text-slate-600')}`}>
      {message}
    </div>
  );
};

const MoodPersona = ({ mood, temp, isDarkMode, personality, yesterdayTemp, lang }) => {
  const isRoast = personality === 'roast';
  return (
    <div className="text-center py-6 z-10 relative w-full">
      <div className="inline-block relative mb-4">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br ${mood.gradient} shadow-2xl animate-bounce-slow relative overflow-hidden group`}>
           <mood.icon className={`w-16 h-16 text-white drop-shadow-md relative z-10 ${isRoast ? 'animate-pulse' : ''}`} />
           {isRoast && <div className="absolute inset-0 bg-red-600 mix-blend-overlay animate-pulse"></div>}
        </div>
        <div className={`absolute -top-2 -right-8 px-3 py-1 rounded-full shadow-md text-xs font-bold animate-in fade-in slide-in-from-bottom-2 ${isRoast ? 'bg-red-600 text-white' : (isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800')}`}>
           {mood.label}
        </div>
      </div>
      
      <h1 className={`text-6xl font-black tracking-tighter mb-1 ${isRoast ? 'text-white drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]' : (isDarkMode ? 'text-white' : 'text-slate-800')}`}>
        {Math.round(temp)}°
      </h1>
      
      <MemoryMood currentTemp={temp} yesterdayTemp={yesterdayTemp} lang={lang} personality={personality} isDarkMode={isDarkMode} />
      
      <div className="max-w-md mx-auto px-6 mt-4">
        <p className={`text-lg font-medium italic mb-2 ${isRoast ? 'text-red-300' : (isDarkMode ? 'text-slate-300' : 'text-slate-700')}`}>"{mood.quote}"</p>
        <div className={`flex items-center justify-center gap-2 text-sm py-1 px-3 rounded-full inline-flex ${isRoast ? 'text-red-200 bg-red-900/50 border border-red-800' : (isDarkMode ? 'text-slate-300 bg-slate-800/50' : 'text-slate-500 bg-white/50')}`}>
           <Glasses size={14} />
           <span>{mood.advice}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP COMPONENT
 */
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

  // Init AdMob when app mounts (only works in Capacitor)
  // تهيئة الإعلانات عند بدء التطبيق
  useEffect(() => {
    initializeAdMob();
    // Show banner after a small delay
    // إظهار البانر بعد فترة وجيزة
    const timer = setTimeout(() => {
        showBannerAd();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
     setLocation(prev => ({ ...prev, name: TRANSLATIONS[lang].detecting }));
  }, []);

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
  }, [lang]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location.lat) return;

      setLoading(true);
      setError(null);
      
      try {
        const lat = activeLocationType === 'current' ? location.lat : location.lat + 0.05;
        const lon = activeLocationType === 'current' ? location.lon : location.lon + 0.05;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=2&forecast_days=2&timezone=auto`;
        
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
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-1000 ${currentMood.bg}`}>
      
      <WeatherBackground type={currentMood.type} isDarkMode={isDarkMode} personality={personality} />

      <div className="relative z-20 px-6 pt-6 flex items-center justify-between max-w-md mx-auto">
         <div className="flex gap-2">
           <button 
             onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
             className={`p-2 rounded-full backdrop-blur-md shadow-sm border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700 text-white' : 'bg-white/40 border-white/20 text-slate-800'}`}
             title="Switch Language"
           >
              <Globe size={18} />
           </button>
           
           <button 
             onClick={() => {
                setPersonality('roast');
                if (navigator.vibrate) navigator.vibrate(50);
             }}
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
                 <DetailMetric icon={Wind} label={TRANSLATIONS[lang].wind} value={displayData.wind} unit="km/h" delay={200} isDarkMode={isDarkMode} lang={lang} personality={personality} />
                 <DetailMetric icon={Droplets} label={TRANSLATIONS[lang].humidity} value={displayData.humidity} unit="%" delay={300} isDarkMode={isDarkMode} lang={lang} personality={personality} />
                 <DetailMetric icon={Navigation} label={TRANSLATIONS[lang].direction} value={currentMood.type === 'sunny' ? 'N' : 'SW'} unit="" delay={400} isDarkMode={isDarkMode} lang={lang} personality={personality} />
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

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulse-slow { 0%, 100% { opacity: ${isDarkMode ? 0.1 : 0.4}; transform: scale(1); } 50% { opacity: ${isDarkMode ? 0.2 : 0.6}; transform: scale(1.1); } }
        @keyframes rain { 0% { background-position: 0 0; } 100% { background-position: 20px 200px; } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-rain { animation: rain 0.5s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
