import React from 'react';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  SunMedium, 
  Gauge, 
  CloudRain, 
  Sunrise, 
  Sunset,
  Navigation
} from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';
import { getUVLevel } from '../../utils/weatherHelpers';

export const WeatherMetricsGrid = ({ activeData, lang, isDarkMode, personality }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isRoast = personality === 'roast';
  const uvInfo = getUVLevel(activeData?.uvIndex, lang);

  if (!activeData) return null;

  const metrics = [
    {
      id: 'feelsLike',
      label: t.feelsLike,
      value: Math.round(activeData.feelsLike),
      unit: '°C',
      icon: Thermometer,
      subtext: `${t.today}: ${Math.round(activeData.temp)}°C`,
    },
    {
      id: 'wind',
      label: t.wind,
      value: Math.round(activeData.wind),
      unit: 'km/h',
      icon: Wind,
      subtext: `${t.direction}: ${activeData.windDirection}`,
      extraIcon: Navigation,
    },
    {
      id: 'humidity',
      label: t.humidity,
      value: Math.round(activeData.humidity),
      unit: '%',
      icon: Droplets,
      subtext: activeData.humidity > 70 ? (lang === 'en' ? 'High Moisture' : 'رطوبة عالية') : (lang === 'en' ? 'Comfortable' : 'معتدل'),
    },
    {
      id: 'uvIndex',
      label: t.uvIndex,
      value: activeData.uvIndex !== undefined ? Math.round(activeData.uvIndex) : '-',
      unit: '',
      icon: SunMedium,
      badge: uvInfo.label,
      badgeColor: uvInfo.color,
    },
    {
      id: 'rain',
      label: t.precipitation,
      value: `${Math.round(activeData.precipProb)}%`,
      unit: '',
      icon: CloudRain,
      subtext: activeData.precipSum > 0 ? `${activeData.precipSum} mm` : (lang === 'en' ? 'No Rain' : 'بدون أمطار'),
    },
    {
      id: 'pressure',
      label: t.pressure,
      value: activeData.pressure,
      unit: 'hPa',
      icon: Gauge,
      subtext: activeData.pressure >= 1013 ? (lang === 'en' ? 'High' : 'مرتفع') : (lang === 'en' ? 'Low' : 'منخفض'),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-1">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 
          className={`
            text-xs font-black uppercase tracking-wider
            ${isRoast ? 'text-red-400' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}
          `}
        >
          {t.detailsTitle}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {metrics.map((m) => {
          const MIcon = m.icon;
          return (
            <div
              key={m.id}
              className={`
                p-3.5 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between
                ${isRoast
                  ? 'bg-red-950/25 border-red-900/40 hover:bg-red-900/30'
                  : isDarkMode
                    ? 'bg-slate-900/50 border-slate-800/70 hover:bg-slate-850'
                    : 'bg-white/60 border-white/60 hover:bg-white/80 shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div 
                  className={`
                    p-2 rounded-2xl
                    ${isRoast 
                      ? 'bg-red-900/40 text-red-300' 
                      : isDarkMode 
                        ? 'bg-slate-800 text-slate-300' 
                        : 'bg-slate-100 text-slate-700'
                    }
                  `}
                >
                  <MIcon size={16} />
                </div>

                {m.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-bold opacity-60 block truncate">{m.label}</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span 
                    className={`
                      text-xl font-extrabold tabular-nums
                      ${isRoast ? 'text-white' : isDarkMode ? 'text-white' : 'text-slate-800'}
                    `}
                  >
                    {m.value}
                  </span>
                  {m.unit && <span className="text-xs opacity-60 font-semibold">{m.unit}</span>}
                </div>
                {m.subtext && (
                  <span className="text-[10px] font-medium opacity-50 block mt-0.5 truncate">
                    {m.subtext}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Daylight Info (Sunrise & Sunset) */}
      <div 
        className={`
          mt-2.5 p-3.5 rounded-3xl backdrop-blur-xl border flex items-center justify-around transition-all
          ${isRoast
            ? 'bg-red-950/25 border-red-900/40'
            : isDarkMode
              ? 'bg-slate-900/50 border-slate-800/70'
              : 'bg-white/60 border-white/60 shadow-sm'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-500">
            <Sunrise size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold opacity-60 uppercase">{t.sunrise}</span>
            <p className="text-sm font-extrabold tabular-nums">{activeData.sunrise}</p>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-500/20"></div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-rose-500/20 text-rose-500">
            <Sunset size={18} />
          </div>
          <div>
            <span className="text-[10px] font-bold opacity-60 uppercase">{t.sunset}</span>
            <p className="text-sm font-extrabold tabular-nums">{activeData.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
