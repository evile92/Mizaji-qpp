import React from 'react';
import { Compass } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const QiblaCompass = ({ bearingAngle, lang, isDarkMode }) => {
  const t = TRANSLATIONS[lang]?.prayer || TRANSLATIONS.en.prayer;

  return (
    <div 
      className={`
        p-4 rounded-3xl backdrop-blur-xl border transition-all flex items-center justify-between gap-4 mt-4
        ${isDarkMode 
          ? 'bg-slate-900/60 border-slate-800/80 text-white' 
          : 'bg-white/70 border-white/70 text-slate-800 shadow-sm'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-500">
          <Compass size={22} className="animate-spin-slow" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider">{t.qiblaTitle}</h4>
          <p className="text-xs font-semibold opacity-70 mt-0.5">
            {bearingAngle}° {t.qiblaDegree}
          </p>
        </div>
      </div>

      {/* Visual Mini Compass Rose */}
      <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-500/5">
        <div 
          className="absolute w-1 h-6 bg-gradient-to-t from-transparent to-emerald-500 rounded-full transition-transform duration-700 origin-bottom"
          style={{ transform: `rotate(${bearingAngle}deg)` }}
        />
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
      </div>
    </div>
  );
};
