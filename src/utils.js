import { Sun, Cloud, CloudFog, CloudRain, Snowflake, CloudLightning } from 'lucide-react';
import { TRANSLATIONS } from './constants';

// --- ADMOB HELPERS ---
export const initializeAdMob = async () => {
  try {
    console.log('AdMob Initialized');
  } catch (e) {
    console.error('AdMob Init Error:', e);
  }
};

export const showBannerAd = async () => {
  try {
    console.log('Showing Banner Ad');
  } catch (e) {
    console.error('Banner Ad Error:', e);
  }
};

// --- WEATHER HELPERS ---

export const getThemeColors = (type, isDarkMode, isRoastMode) => {
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

export const getWeatherMood = (code, lang, isDarkMode, personality) => {
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

export const formatDate = (isoDate, lang) => {
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
