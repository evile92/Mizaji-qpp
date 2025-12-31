import React from 'react';
import { Smile, Meh, Flame, X } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { formatDate } from '../utils';

export const PersonalitySlider = ({ personality, setPersonality, lang, isDarkMode }) => {
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

export const WeatherBackground = ({ type, isDarkMode, personality }) => {
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

export const MapModal = ({ isOpen, onClose, lat, lon, title, isDarkMode }) => {
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

export const DailyCard = ({ day, mood, isSelected, onClick, lang, isDarkMode, personality }) => {
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

export const DetailMetric = ({ icon: Icon, label, value, unit, delay, isDarkMode, lang, personality }) => {
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
