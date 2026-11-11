import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';
import { getWeatherIcon, formatDate, convertTemp } from '../../utils/weatherHelpers';

export const DailyForecastGrid = ({
  dailyData,
  selectedDayIndex,
  onSelectDay,
  lang,
  unit = 'metric',
  isDarkMode,
  personality,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRoast = personality === 'roast';

  if (!dailyData || dailyData.length === 0) return null;

  // Calculate min & max temp across all 7 days for relative progress bar scaling
  const allMax = Math.max(...dailyData.map((d) => d.tempMax));
  const allMin = Math.min(...dailyData.map((d) => d.tempMin));
  const tempRange = Math.max(allMax - allMin, 1);

  return (
    <div className="w-full max-w-md mx-auto mt-6 mb-4 px-1">
      {/* Title */}
      <div className="flex items-center gap-1.5 mb-3 px-1">
        <Calendar size={13} className={isRoast ? 'text-red-400' : 'opacity-60'} />
        <h2 
          className={`
            text-xs font-black uppercase tracking-wider
            ${isRoast ? 'text-red-400' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}
          `}
        >
          {t.timeline}
        </h2>
      </div>

      {/* Daily Cards List */}
      <div className="flex flex-col gap-2">
        {dailyData.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const DIcon = getWeatherIcon(day.code);
          const dateLabel = formatDate(day.time, lang);

          // Bar calculations
          const minPercent = ((day.tempMin - allMin) / tempRange) * 100;
          const maxPercent = ((day.tempMax - allMin) / tempRange) * 100;
          const barWidth = Math.max(maxPercent - minPercent, 12);

          return (
            <button
              key={day.time}
              onClick={() => onSelectDay(idx)}
              className={`
                w-full p-3.5 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex items-center justify-between gap-3 text-left
                ${isSelected
                  ? (isRoast
                      ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/30 ring-2 ring-red-400 scale-[1.02]'
                      : isDarkMode
                        ? 'bg-slate-800 text-white border-slate-600 shadow-lg shadow-black/30 ring-2 ring-slate-400 scale-[1.02]'
                        : 'bg-white text-slate-800 border-white shadow-md ring-2 ring-slate-800/20 scale-[1.02]'
                    )
                  : (isRoast
                      ? 'bg-red-950/20 border-red-900/30 text-red-200 hover:bg-red-900/30'
                      : isDarkMode
                        ? 'bg-slate-900/50 border-slate-800/70 text-slate-200 hover:bg-slate-850'
                        : 'bg-white/60 border-white/60 text-slate-800 hover:bg-white/80 shadow-sm'
                    )
                }
              `}
            >
              {/* Day Date Label */}
              <div className="w-24 flex-shrink-0">
                <span className="text-xs font-black block truncate">
                  {dateLabel}
                </span>
                {day.precipProb > 20 && (
                  <div className="flex items-center gap-1 mt-0.5 opacity-80">
                    <Droplets size={10} className="text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400">{Math.round(day.precipProb)}%</span>
                  </div>
                )}
              </div>

              {/* Weather Icon */}
              <div className="flex-shrink-0">
                <DIcon 
                  size={20} 
                  className={isSelected ? 'text-white' : isRoast ? 'text-red-400' : 'text-amber-400'} 
                />
              </div>

              {/* Min Temp */}
              <span className="text-xs font-bold opacity-60 w-8 text-right tabular-nums">
                {Math.round(convertTemp(day.tempMin, unit))}°
              </span>

              {/* Visual Temperature Range Bar */}
              <div className="flex-1 h-2 bg-slate-500/20 rounded-full overflow-hidden relative">
                <div
                  className={`
                    h-full rounded-full transition-all duration-500
                    ${isSelected
                      ? 'bg-white'
                      : isRoast
                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-amber-400 to-rose-500'
                    }
                  `}
                  style={{
                    marginLeft: `${minPercent}%`,
                    width: `${barWidth}%`,
                  }}
                />
              </div>

              {/* Max Temp */}
              <span className="text-sm font-extrabold w-8 text-right tabular-nums">
                {Math.round(convertTemp(day.tempMax, unit))}°
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
