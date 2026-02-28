import React, { useRef } from 'react';
import { Sun, Cloud, CloudFog, CloudRain, Snowflake, CloudLightning, Droplets } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

const WMO_ICON = (code) => {
  if (code === 0) return Sun;
  if ([1, 2, 3].includes(code)) return Cloud;
  if ([45, 48].includes(code)) return CloudFog;
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return CloudRain;
  if ([71,73,75,77,85,86].includes(code)) return Snowflake;
  if ([95,96,99].includes(code)) return CloudLightning;
  return Cloud;
};

const WMO_COLOR = (code, isDarkMode) => {
  if (code === 0) return isDarkMode ? 'text-yellow-400' : 'text-orange-500';
  if ([1,2,3].includes(code)) return isDarkMode ? 'text-slate-400' : 'text-slate-500';
  if ([45,48].includes(code)) return isDarkMode ? 'text-gray-400' : 'text-gray-500';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return isDarkMode ? 'text-blue-400' : 'text-blue-500';
  if ([71,73,75,77,85,86].includes(code)) return isDarkMode ? 'text-cyan-300' : 'text-cyan-500';
  if ([95,96,99].includes(code)) return isDarkMode ? 'text-purple-400' : 'text-purple-600';
  return isDarkMode ? 'text-slate-400' : 'text-slate-500';
};

export const HourlyForecast = ({ hourlyData, isDarkMode, personality, lang }) => {
  const scrollRef = useRef(null);
  const isRoast = personality === 'roast';
  const t = TRANSLATIONS[lang];

  if (!hourlyData || hourlyData.length === 0) return null;

  // Find current hour index to highlight it
  const nowHour = new Date().getHours();

  return (
    <div className="mt-6 mb-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 opacity-60 px-1">
        <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          {t.hourly}
        </span>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {hourlyData.map((hour, idx) => {
          const Icon = WMO_ICON(hour.code);
          const iconColor = WMO_COLOR(hour.code, isDarkMode);
          const isNow = hour.hour === nowHour && idx < 24;
          const isRaining = [51,53,55,56,57,61,63,65,66,67,80,81,82].includes(hour.code);

          return (
            <div
              key={idx}
              className={`
                snap-center flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl
                transition-all duration-300 min-w-[64px]
                ${isNow
                  ? (isRoast
                      ? 'bg-red-700 text-white ring-2 ring-red-400 scale-105 shadow-lg'
                      : (isDarkMode ? 'bg-slate-600 text-white ring-2 ring-slate-400 scale-105 shadow-lg' : 'bg-slate-800 text-white ring-2 ring-slate-600 scale-105 shadow-lg'))
                  : (isRoast
                      ? 'bg-red-950/40 border border-red-900/40 text-red-200'
                      : (isDarkMode ? 'bg-slate-800/50 border border-slate-700 text-white' : 'bg-white/50 border border-white/30 text-slate-800'))
                }
              `}
            >
              {/* Time */}
              <span className={`text-xs font-bold ${isNow ? 'opacity-100' : 'opacity-60'}`}>
                {isNow ? (lang === 'ma' ? 'دبا' : lang === 'ar' ? 'الآن' : 'Now') : `${hour.hour}:00`}
              </span>

              {/* Icon */}
              <Icon className={`w-5 h-5 ${isNow ? 'text-white' : iconColor}`} />

              {/* Temp */}
              <span className="text-sm font-bold">{Math.round(hour.temp)}°</span>

              {/* Rain probability */}
              {isRaining && hour.precip > 0 && (
                <div className="flex items-center gap-0.5">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span className="text-xs opacity-70">{Math.round(hour.precip)}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
