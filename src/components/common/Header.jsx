import React from 'react';
import { 
  Globe, 
  Flame, 
  Search, 
  MapPin, 
  Share2, 
  Map as MapIcon, 
  Sun, 
  Moon,
  RefreshCw
} from 'lucide-react';

export const Header = ({
  lang,
  onToggleLang,
  unit = 'metric',
  onToggleUnit,
  isDarkMode,
  onToggleDarkMode,
  personality,
  onTriggerRoast,
  locationDisplayName,
  isGpsActive,
  onOpenSearch,
  onOpenMap,
  onOpenShare,
  onRefresh,
  isLoading,
}) => {
  const isRoast = personality === 'roast';

  const langLabels = {
    en: 'EN',
    ar: 'عربي',
    ma: 'دارجة',
  };

  return (
    <header className="relative z-30 px-4 pt-3 pb-2 max-w-lg mx-auto w-full flex flex-col gap-2.5">
      {/* Brand Logo */}
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Mizaji"
          className="h-11 w-auto object-contain drop-shadow-md select-none"
          draggable="false"
        />
      </div>

      {/* Top action row */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Language, Unit & Roast Trigger */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleLang}
            aria-label="Change Language"
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300
              ${isDarkMode 
                ? 'bg-slate-900/60 border border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white/70 border border-white/60 text-slate-800 hover:bg-white shadow-sm'
              } backdrop-blur-xl active:scale-95
            `}
          >
            <Globe size={14} className="opacity-70" />
            <span>{langLabels[lang] || 'EN'}</span>
          </button>

          <button
            onClick={onToggleUnit}
            aria-label="Toggle Temperature Unit"
            className={`
              px-2.5 py-1.5 rounded-full text-xs font-extrabold tabular-nums transition-all duration-300
              ${isDarkMode 
                ? 'bg-slate-900/60 border border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white/70 border border-white/60 text-slate-800 hover:bg-white shadow-sm'
              } backdrop-blur-xl active:scale-95
            `}
          >
            {unit === 'imperial' ? '°F' : '°C'}
          </button>

          <button
            onClick={onTriggerRoast}
            aria-label="Activate Roast Mode"
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300
              ${isRoast
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 ring-2 ring-red-400 animate-pulse'
                : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 shadow-md active:scale-95'
              }
            `}
          >
            <Flame size={15} className={isRoast ? 'animate-bounce' : ''} />
            <span className="hidden xs:inline">ROAST</span>
          </button>
        </div>

        {/* Right: Share, Map, Theme */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenShare}
            aria-label="Share Weather Card"
            className={`
              p-2 rounded-full transition-all duration-300
              ${isDarkMode 
                ? 'bg-slate-900/60 border border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white/70 border border-white/60 text-slate-800 hover:bg-white shadow-sm'
              } backdrop-blur-xl active:scale-90
            `}
          >
            <Share2 size={16} />
          </button>

          <button
            onClick={onOpenMap}
            aria-label="Open Weather Map"
            className={`
              p-2 rounded-full transition-all duration-300
              ${isDarkMode 
                ? 'bg-slate-900/60 border border-slate-700/60 text-slate-200 hover:bg-slate-800' 
                : 'bg-white/70 border border-white/60 text-slate-800 hover:bg-white shadow-sm'
              } backdrop-blur-xl active:scale-90
            `}
          >
            <MapIcon size={16} />
          </button>

          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle Dark Mode"
            className={`
              p-2 rounded-full transition-all duration-300
              ${isDarkMode 
                ? 'bg-slate-900/60 border border-slate-700/60 text-amber-400 hover:bg-slate-800' 
                : 'bg-white/70 border border-white/60 text-slate-700 hover:bg-white shadow-sm'
              } backdrop-blur-xl active:scale-90
            `}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Location Bar with Search Trigger & Refresh */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onOpenSearch}
          className={`
            flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 text-left
            ${isDarkMode 
              ? 'bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 text-slate-100' 
              : 'bg-white/60 hover:bg-white/90 border border-white/60 text-slate-800 shadow-sm'
            } backdrop-blur-xl group
          `}
        >
          <div className={`p-1.5 rounded-xl ${isRoast ? 'bg-red-600/20 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
            <MapPin size={15} />
          </div>
          <div className="flex-1 truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold truncate">{locationDisplayName}</span>
              {isGpsActive && (
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-500 rounded-md">
                  GPS
                </span>
              )}
            </div>
          </div>
          <Search size={14} className="opacity-40 group-hover:opacity-80 transition-opacity" />
        </button>

        <button
          onClick={onRefresh}
          aria-label="Refresh Weather Data"
          className={`
            p-2.5 rounded-2xl transition-all duration-300
            ${isDarkMode 
              ? 'bg-slate-900/50 border border-slate-800 text-slate-300 hover:bg-slate-800' 
              : 'bg-white/60 border border-white/60 text-slate-700 hover:bg-white shadow-sm'
            } backdrop-blur-xl active:rotate-180
          `}
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin text-blue-500' : ''} />
        </button>
      </div>
    </header>
  );
};
