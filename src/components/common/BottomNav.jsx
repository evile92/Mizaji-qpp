import React from 'react';
import { CloudSun, Moon, Map } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const BottomNav = ({ activeTab, onChangeTab, lang, isDarkMode, personality }) => {
  const t = TRANSLATIONS[lang]?.tabs || TRANSLATIONS.en.tabs;
  const isRoast = personality === 'roast';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-5 pt-2 px-6 pointer-events-none">
      <nav 
        aria-label="Bottom Navigation"
        className={`
          pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-3xl backdrop-blur-2xl shadow-2xl border transition-all duration-300
          ${isRoast
            ? 'bg-[#150505]/85 border-red-900/50 shadow-red-950/40'
            : isDarkMode
              ? 'bg-slate-900/85 border-slate-700/60 shadow-black/40'
              : 'bg-white/85 border-white/70 shadow-slate-300/40'
          }
        `}
      >
        {/* Weather Tab */}
        <button
          onClick={() => onChangeTab('weather')}
          className={`
            relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300
            ${activeTab === 'weather'
              ? (isRoast 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : isDarkMode 
                    ? 'bg-slate-800 text-white shadow-lg shadow-black/30' 
                    : 'bg-slate-800 text-white shadow-lg shadow-slate-900/20'
                )
              : (isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800')
            }
          `}
        >
          <CloudSun size={18} />
          <span>{t.weather}</span>
        </button>

        {/* Prayer Times Tab */}
        <button
          onClick={() => onChangeTab('prayer')}
          className={`
            relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300
            ${activeTab === 'prayer'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : (isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800')
            }
          `}
        >
          <Moon size={18} />
          <span>{t.prayer}</span>
        </button>
      </nav>
    </div>
  );
};
