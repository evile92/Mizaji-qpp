import { 
  Sun, 
  Cloud, 
  CloudFog, 
  CloudRain, 
  Snowflake, 
  CloudLightning,
  CloudSun,
  CloudDrizzle
} from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

// Map WMO code to weather mood type
export const getMoodTypeFromCode = (code) => {
  if (code === 0) return 'sunny';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'foggy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rainy';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowy';
  if ([95, 96, 99].includes(code)) return 'stormy';
  return 'unknown';
};

// Map WMO code to icon component
export const getWeatherIcon = (code) => {
  if (code === 0) return Sun;
  if (code === 1 || code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if ([45, 48].includes(code)) return CloudFog;
  if ([51, 53, 55, 56, 57].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return Snowflake;
  if ([95, 96, 99].includes(code)) return CloudLightning;
  return Cloud;
};

// Theme colors based on weather mood, dark mode, and roast mode
export const getThemeColors = (type, isDarkMode, isRoastMode) => {
  if (isRoastMode) {
    return {
      bg: 'bg-gradient-to-b from-[#180404] via-[#0d0202] to-[#050000]',
      cardBg: 'bg-red-950/30 border-red-800/40 text-red-100',
      text: 'text-red-500',
      accent: 'bg-red-600',
      gradient: 'from-orange-600 via-red-600 to-rose-700',
      glow: 'shadow-[0_0_50px_-10px_rgba(239,68,68,0.4)]',
      border: 'border-red-900/50',
    };
  }

  if (isDarkMode) {
    switch (type) {
      case 'sunny':
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-950',
          cardBg: 'bg-slate-900/60 border-amber-500/20 text-slate-100',
          text: 'text-amber-400',
          accent: 'bg-amber-500',
          gradient: 'from-amber-500 via-orange-500 to-yellow-600',
          glow: 'shadow-[0_0_40px_-10px_rgba(245,158,11,0.25)]',
          border: 'border-amber-500/20',
        };
      case 'cloudy':
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950',
          cardBg: 'bg-slate-900/60 border-slate-700/40 text-slate-100',
          text: 'text-slate-300',
          accent: 'bg-slate-600',
          gradient: 'from-slate-500 via-slate-600 to-slate-800',
          glow: 'shadow-[0_0_40px_-10px_rgba(148,163,184,0.15)]',
          border: 'border-slate-700/50',
        };
      case 'foggy':
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-zinc-900 to-slate-950',
          cardBg: 'bg-slate-900/60 border-zinc-700/40 text-slate-100',
          text: 'text-zinc-300',
          accent: 'bg-zinc-600',
          gradient: 'from-zinc-400 via-slate-500 to-zinc-700',
          glow: 'shadow-[0_0_40px_-10px_rgba(212,212,216,0.15)]',
          border: 'border-zinc-700/50',
        };
      case 'rainy':
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-950',
          cardBg: 'bg-slate-900/60 border-blue-800/30 text-slate-100',
          text: 'text-blue-400',
          accent: 'bg-blue-600',
          gradient: 'from-blue-500 via-indigo-600 to-sky-700',
          glow: 'shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)]',
          border: 'border-blue-800/40',
        };
      case 'snowy':
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-cyan-950/30 to-slate-950',
          cardBg: 'bg-slate-900/60 border-cyan-800/30 text-slate-100',
          text: 'text-cyan-300',
          accent: 'bg-cyan-500',
          gradient: 'from-cyan-400 via-sky-500 to-blue-600',
          glow: 'shadow-[0_0_40px_-10px_rgba(6,182,212,0.25)]',
          border: 'border-cyan-800/40',
        };
      case 'stormy':
        return {
          bg: 'bg-gradient-to-b from-slate-950 via-purple-950/40 to-black',
          cardBg: 'bg-slate-900/70 border-purple-800/40 text-slate-100',
          text: 'text-purple-400',
          accent: 'bg-purple-600',
          gradient: 'from-purple-600 via-indigo-700 to-slate-900',
          glow: 'shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)]',
          border: 'border-purple-800/50',
        };
      default:
        return {
          bg: 'bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950',
          cardBg: 'bg-slate-900/60 border-slate-700/40 text-slate-100',
          text: 'text-slate-400',
          accent: 'bg-slate-700',
          gradient: 'from-slate-600 to-slate-800',
          glow: 'shadow-none',
          border: 'border-slate-700/50',
        };
    }
  } else {
    // Light Mode
    switch (type) {
      case 'sunny':
        return {
          bg: 'bg-gradient-to-b from-amber-100/80 via-orange-50 to-amber-100/50',
          cardBg: 'bg-white/70 border-amber-200/80 text-amber-950',
          text: 'text-amber-600',
          accent: 'bg-amber-500',
          gradient: 'from-amber-400 via-orange-400 to-yellow-500',
          glow: 'shadow-[0_10px_30px_-5px_rgba(245,158,11,0.25)]',
          border: 'border-amber-200/60',
        };
      case 'cloudy':
        return {
          bg: 'bg-gradient-to-b from-slate-100 via-slate-50 to-gray-200/60',
          cardBg: 'bg-white/75 border-slate-200 text-slate-800',
          text: 'text-slate-600',
          accent: 'bg-slate-500',
          gradient: 'from-slate-300 via-slate-400 to-slate-500',
          glow: 'shadow-[0_10px_30px_-5px_rgba(148,163,184,0.2)]',
          border: 'border-slate-200/80',
        };
      case 'foggy':
        return {
          bg: 'bg-gradient-to-b from-zinc-100 via-gray-100 to-slate-200',
          cardBg: 'bg-white/80 border-zinc-200 text-zinc-900',
          text: 'text-zinc-600',
          accent: 'bg-zinc-500',
          gradient: 'from-zinc-300 via-gray-400 to-zinc-500',
          glow: 'shadow-[0_10px_30px_-5px_rgba(161,161,170,0.2)]',
          border: 'border-zinc-200/80',
        };
      case 'rainy':
        return {
          bg: 'bg-gradient-to-b from-blue-100/80 via-sky-50 to-indigo-100/60',
          cardBg: 'bg-white/75 border-blue-200 text-blue-950',
          text: 'text-blue-600',
          accent: 'bg-blue-500',
          gradient: 'from-sky-400 via-blue-500 to-indigo-600',
          glow: 'shadow-[0_10px_30px_-5px_rgba(59,130,246,0.25)]',
          border: 'border-blue-200/80',
        };
      case 'snowy':
        return {
          bg: 'bg-gradient-to-b from-cyan-100/80 via-sky-50 to-blue-100/60',
          cardBg: 'bg-white/80 border-cyan-200 text-cyan-950',
          text: 'text-cyan-700',
          accent: 'bg-cyan-500',
          gradient: 'from-cyan-300 via-sky-400 to-blue-500',
          glow: 'shadow-[0_10px_30px_-5px_rgba(6,182,212,0.2)]',
          border: 'border-cyan-200/80',
        };
      case 'stormy':
        return {
          bg: 'bg-gradient-to-b from-purple-100 via-slate-100 to-purple-200/60',
          cardBg: 'bg-white/80 border-purple-200 text-purple-950',
          text: 'text-purple-700',
          accent: 'bg-purple-600',
          gradient: 'from-purple-500 via-indigo-600 to-slate-800',
          glow: 'shadow-[0_10px_30px_-5px_rgba(147,51,234,0.25)]',
          border: 'border-purple-200/80',
        };
      default:
        return {
          bg: 'bg-gradient-to-b from-gray-100 to-slate-200',
          cardBg: 'bg-white/80 border-gray-200 text-gray-800',
          text: 'text-gray-600',
          accent: 'bg-gray-500',
          gradient: 'from-gray-300 to-gray-500',
          glow: 'shadow-none',
          border: 'border-gray-200',
        };
    }
  }
};

// Convert wind degrees (0-360) to compass direction label
export const degreesToCompass = (degrees, lang = 'en') => {
  if (degrees === null || degrees === undefined || degrees === '-') return '-';
  
  const dirsEn = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const dirsAr = ['شمال', 'ش.شرقي', 'شرق', 'ج.شرقي', 'جنوب', 'ج.غربي', 'غرب', 'ش.غربي'];
  const dirsMa = ['الشمال', 'ش.شرق', 'الشرق', 'ج.شرق', 'الجنوب (الشرقي)', 'ج.غرب', 'الغرب', 'ش.غرب'];

  const index = Math.round(degrees / 45) % 8;
  if (lang === 'ar') return dirsAr[index];
  if (lang === 'ma') return dirsMa[index];
  return dirsEn[index];
};

// UV Index level categorization
export const getUVLevel = (uvIndex, lang = 'en') => {
  const t = TRANSLATIONS[lang]?.uvLevels || TRANSLATIONS.en.uvLevels;
  if (uvIndex === null || uvIndex === undefined || uvIndex === '-') return { label: '-', color: 'text-slate-400' };
  
  const val = Number(uvIndex);
  if (val <= 2) return { label: t.low, color: 'text-emerald-500' };
  if (val <= 5) return { label: t.moderate, color: 'text-yellow-500' };
  if (val <= 7) return { label: t.high, color: 'text-orange-500' };
  if (val <= 10) return { label: t.veryHigh, color: 'text-rose-500' };
  return { label: t.extreme, color: 'text-purple-500' };
};

// Full weather mood bundle resolver
export const getWeatherMood = (code, lang = 'en', isDarkMode = false, personality = 'sarcastic', quoteSeed = 0) => {
  const t = TRANSLATIONS[lang]?.moods || TRANSLATIONS.en.moods;
  const moodType = getMoodTypeFromCode(code);
  const moodData = t[moodType] || t.unknown;
  const icon = getWeatherIcon(code);
  const colors = getThemeColors(moodType, isDarkMode, personality === 'roast');

  const pKey = ['calm', 'sarcastic', 'roast'].includes(personality) ? personality : 'sarcastic';
  const personalityContent = moodData[pKey] || moodData.sarcastic;

  const quotesList = Array.isArray(personalityContent.quotes) ? personalityContent.quotes : [personalityContent.quote || ''];
  const excusesList = Array.isArray(personalityContent.excuses) ? personalityContent.excuses : [personalityContent.excuse || ''];

  const selectedQuote = quotesList[Math.abs(quoteSeed) % quotesList.length] || quotesList[0];
  const selectedExcuse = excusesList[Math.abs(quoteSeed) % excusesList.length] || excusesList[0];

  return {
    type: moodType,
    code,
    icon,
    label: moodData.label,
    quote: selectedQuote,
    advice: personalityContent.advice,
    excuse: selectedExcuse,
    ...colors,
  };
};

// Date formatter for daily cards
export const formatDate = (isoDate, lang = 'en') => {
  if (!isoDate) return '';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const d = new Date(isoDate);
  const today = new Date();
  
  const dSet = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const tSet = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = dSet - tSet;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return t.today;
  if (diffDays === 1) return t.tomorrow;
  if (diffDays === -1) return t.yesterday;
  if (diffDays === -2) return t.daysAgo;
  
  const locale = lang === 'en' ? 'en-US' : 'ar-MA';
  return d.toLocaleDateString(locale, { weekday: 'short', month: 'numeric', day: 'numeric' });
};
