import React from 'react';
import { Glasses } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

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

export const MoodPersona = ({ mood, temp, isDarkMode, personality, yesterdayTemp, lang }) => {
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
