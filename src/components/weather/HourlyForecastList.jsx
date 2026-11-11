import React, { useRef, useEffect } from 'react';
import { Droplets, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';
import { getWeatherIcon, convertTemp } from '../../utils/weatherHelpers';

export const HourlyForecastList = ({
  hourlyData,
  isToday,
  lang,
  unit = 'metric',
  isDarkMode,
  personality,
}) => {
  const scrollContainerRef = useRef(null);
  const currentHourRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRoast = personality === 'roast';
  const nowHour = new Date().getHours();

  // Auto-scroll to current hour on load
  useEffect(() => {
    if (isToday && currentHourRef.current && scrollContainerRef.current) {
      setTimeout(() => {
        currentHourRef.current?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }, 300);
    }
  }, [isToday, hourlyData]);

  if (!hourlyData || hourlyData.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-1">
      {/* Title */}
      <div className="flex items-center gap-1.5 mb-3 px-1">
        <Clock size={13} className={isRoast ? 'text-red-400' : 'opacity-60'} />
        <h2 
          className={`
            text-xs font-black uppercase tracking-wider
            ${isRoast ? 'text-red-400' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}
          `}
        >
          {t.hourly}
        </h2>
      </div>

      {/* Horizontal Scroll Row */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {hourlyData.map((item, idx) => {
          const HIcon = getWeatherIcon(item.code);
          const isNow = isToday && item.hour === nowHour;

          // Time string
          const displayTime = isNow 
            ? (lang === 'ma' ? 'دبا' : lang === 'ar' ? 'الآن' : 'Now')
            : `${item.hour}:00`;

          return (
            <div
              key={idx}
              ref={isNow ? currentHourRef : null}
              className={`
                snap-center flex-shrink-0 flex flex-col items-center justify-between py-3.5 px-3.5 rounded-3xl
                transition-all duration-300 min-w-[72px] backdrop-blur-xl border
                ${isNow
                  ? (isRoast
                      ? 'bg-red-600 text-white border-red-400 shadow-xl shadow-red-600/40 ring-2 ring-red-400 scale-105'
                      : isDarkMode
                        ? 'bg-slate-700 text-white border-slate-500 shadow-xl shadow-black/30 ring-2 ring-slate-400 scale-105'
                        : 'bg-slate-800 text-white border-slate-700 shadow-xl shadow-slate-900/30 ring-2 ring-slate-700 scale-105'
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
              {/* Hour / Label */}
              <span className={`text-[11px] font-extrabold ${isNow ? 'text-white' : 'opacity-70'}`}>
                {displayTime}
              </span>

              {/* Weather Icon */}
              <div className="my-2">
                <HIcon size={22} className={isNow ? 'text-white' : isRoast ? 'text-red-400' : 'text-amber-400'} />
              </div>

              {/* Temp */}
              <span className="text-base font-black tabular-nums">
                {Math.round(convertTemp(item.temp, unit))}°
              </span>

              {/* Rain probability if > 0 */}
              {item.precip > 0 ? (
                <div className="flex items-center gap-0.5 mt-1">
                  <Droplets size={10} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-400">{Math.round(item.precip)}%</span>
                </div>
              ) : (
                <div className="h-3.5"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
