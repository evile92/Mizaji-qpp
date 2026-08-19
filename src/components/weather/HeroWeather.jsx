import React, { useState } from 'react';
import { 
  Smile, 
  Meh, 
  Flame, 
  Glasses, 
  Copy, 
  Check, 
  Dices,
  Sparkles,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const HeroWeather = ({
  mood,
  activeData,
  personality,
  onChangePersonality,
  onShuffleRoast,
  lang,
  isDarkMode,
  onTapEffect,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRoast = personality === 'roast';
  const Icon = mood.icon;

  const personalities = [
    { id: 'calm', label: t.personalities?.calm || 'Calm', icon: Smile },
    { id: 'sarcastic', label: t.personalities?.sarcastic || 'Sarcastic', icon: Meh },
    { id: 'roast', label: t.personalities?.roast || 'Roast', icon: Flame },
  ];

  const handleCopyExcuse = () => {
    const text = mood.excuse || 'Technical issues, cannot leave today.';
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    if (onTapEffect) onTapEffect();
    setTimeout(() => setCopied(false), 2200);
  };

  // Memory comparison text builder
  const getMemoryText = () => {
    if (!activeData || activeData.tempDiffFromYesterday === undefined || !activeData.isToday) {
      return null;
    }
    const diff = activeData.tempDiffFromYesterday;
    const m = t.memory;
    if (!m) return null;

    if (Math.abs(diff) < 2) {
      return isRoast ? m.roast_same : m.same;
    }
    if (diff > 0) {
      const template = isRoast ? m.roast_warmer : m.warmer;
      return template.replace('{diff}', String(diff));
    }
    const template = isRoast ? m.roast_colder : m.colder;
    return template.replace('{diff}', String(Math.abs(diff)));
  };

  const memoryMessage = getMemoryText();

  return (
    <div className="relative z-10 w-full flex flex-col items-center pt-2 pb-4">
      {/* Personality Pill Switcher */}
      <div 
        className={`
          flex items-center p-1 rounded-full border mb-5 max-w-xs w-full backdrop-blur-xl transition-all duration-300
          ${isRoast 
            ? 'bg-red-950/40 border-red-800/40 shadow-lg shadow-red-950/30' 
            : isDarkMode 
              ? 'bg-slate-900/60 border-slate-700/50 shadow-lg shadow-black/20' 
              : 'bg-white/60 border-white/60 shadow-sm'
          }
        `}
      >
        {personalities.map((p) => {
          const isActive = personality === p.id;
          const PIcon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => onChangePersonality(p.id)}
              className={`
                flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-extrabold transition-all duration-300
                ${isActive
                  ? (p.id === 'roast'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/40 scale-102'
                      : isDarkMode
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'bg-slate-800 text-white shadow-sm'
                    )
                  : (isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900')
                }
              `}
            >
              <PIcon size={14} className={isActive && p.id === 'roast' ? 'animate-bounce' : ''} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Weather Animated Orb & Condition Label */}
      <div className="relative mb-3 flex flex-col items-center">
        <div 
          className={`
            w-32 h-32 rounded-3xl flex items-center justify-center bg-gradient-to-br ${mood.gradient} 
            ${mood.glow} animate-bounce-slow relative overflow-hidden transition-all duration-500 shadow-2xl
          `}
        >
          <Icon className="w-16 h-16 text-white drop-shadow-lg relative z-10" />
          {isRoast && (
            <div className="absolute inset-0 bg-red-600/30 mix-blend-color-dodge animate-pulse"></div>
          )}
          <div className="absolute -inset-1 bg-white/20 blur-sm rounded-3xl -z-0"></div>
        </div>

        {/* Condition Badge */}
        <div 
          className={`
            -mt-3.5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-xl border shadow-md transition-all
            ${isRoast 
              ? 'bg-red-600 text-white border-red-500' 
              : isDarkMode 
                ? 'bg-slate-800/90 text-slate-100 border-slate-700' 
                : 'bg-white/90 text-slate-800 border-white'
            }
          `}
        >
          {mood.label}
        </div>
      </div>

      {/* Main Temperature Display */}
      <div className="flex flex-col items-center mt-2">
        <div className="flex items-start justify-center">
          <span 
            className={`
              text-7xl sm:text-8xl font-black tracking-tighter leading-none tabular-nums
              ${isRoast 
                ? 'text-white drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]' 
                : isDarkMode 
                  ? 'text-white' 
                  : 'text-slate-800'
              }
            `}
          >
            {Math.round(activeData.temp)}
          </span>
          <span className={`text-4xl font-light mt-1 ${isRoast ? 'text-red-400' : mood.text}`}>
            °C
          </span>
        </div>

        {/* High / Low Range & Feels Like */}
        <div className="flex items-center gap-3 mt-2 text-xs font-bold opacity-75">
          <div className="flex items-center gap-0.5">
            <ArrowUp size={12} className="text-rose-500" />
            <span>{Math.round(activeData.tempMax)}°</span>
          </div>
          <div className="flex items-center gap-0.5">
            <ArrowDown size={12} className="text-sky-500" />
            <span>{Math.round(activeData.tempMin)}°</span>
          </div>
          <span className="opacity-40">•</span>
          <span>{t.feelsLike}: {Math.round(activeData.feelsLike)}°</span>
        </div>

        {/* Memory comparison line */}
        {memoryMessage && (
          <p className={`mt-2 text-xs font-semibold text-center px-4 max-w-sm ${isRoast ? 'text-red-400' : (isDarkMode ? 'text-slate-400' : 'text-slate-600')}`}>
            {memoryMessage}
          </p>
        )}
      </div>

      {/* Quote & Sarcasm Card */}
      <div className="w-full max-w-md px-2 mt-4 flex flex-col items-center gap-3">
        <div 
          className={`
            w-full p-4 rounded-3xl backdrop-blur-xl border transition-all duration-300 relative text-center
            ${isRoast
              ? 'bg-red-950/30 border-red-900/40 shadow-lg shadow-red-950/20'
              : isDarkMode
                ? 'bg-slate-900/50 border-slate-800/80 shadow-md'
                : 'bg-white/50 border-white/60 shadow-sm'
            }
          `}
        >
          <p 
            className={`
              text-base font-semibold leading-relaxed
              ${isRoast ? 'text-red-200' : isDarkMode ? 'text-slate-200' : 'text-slate-700'}
            `}
          >
            "{mood.quote}"
          </p>

          {/* Advice Tag */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium opacity-80">
            <Glasses size={14} className={isRoast ? 'text-red-400' : mood.text} />
            <span>{mood.advice}</span>
          </div>
        </div>

        {/* Action Buttons: Shuffle Roast & Copy Excuse */}
        <div className="flex items-center gap-2">
          {/* Shuffle Roast */}
          <button
            onClick={onShuffleRoast}
            aria-label="Shuffle Roast"
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95
              ${isRoast 
                ? 'bg-red-900/40 hover:bg-red-800/50 text-red-200 border border-red-800/40' 
                : isDarkMode 
                  ? 'bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 border border-slate-700' 
                  : 'bg-white/70 hover:bg-white text-slate-700 border border-white/60 shadow-sm'
              }
            `}
          >
            <Dices size={15} />
            <span>{t.shuffleRoast}</span>
          </button>

          {/* Copy Excuse */}
          <button
            onClick={handleCopyExcuse}
            aria-label="Copy Absence Excuse"
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wide transition-all active:scale-95
              ${copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : isRoast
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
                  : isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    : 'bg-slate-800 hover:bg-slate-900 text-white shadow-md'
              }
            `}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? t.excuseCopied : t.excuseBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
