import React from 'react';
import { 
  Star, 
  MapPin, 
  RefreshCw, 
  Clock, 
  Settings2,
  ChevronDown
} from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';
import { 
  PRAYER_META, 
  formatPrayerTime, 
  formatCountdown, 
  toMinutes, 
  getNowMinutes 
} from '../../utils/prayerHelpers';
import { QiblaCompass } from './QiblaCompass';

export const PrayerTimesView = ({
  prayers,
  hijri,
  nextPrayerInfo,
  qiblaAngle,
  locationName,
  loading,
  error,
  calcMethod,
  onChangeCalcMethod,
  onRefresh,
  lang,
  isDarkMode,
}) => {
  const t = TRANSLATIONS[lang]?.prayer || TRANSLATIONS.en.prayer;
  const commonT = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const nowMins = getNowMinutes();

  const prayerKeys = [
    { key: 'Fajr', label: t.fajr },
    { key: 'Sunrise', label: t.sunrise },
    { key: 'Dhuhr', label: t.dhuhr },
    { key: 'Asr', label: t.asr },
    { key: 'Maghrib', label: t.maghrib },
    { key: 'Isha', label: t.isha },
  ];

  const nextKey = nextPrayerInfo?.nextKey;
  const countdownText = formatCountdown(nextPrayerInfo?.remainingMinutes ?? 0, lang);

  if (error && !prayers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <p className="text-sm text-red-500 font-bold mb-4">{error}</p>
        <button
          onClick={onRefresh}
          className="px-6 py-2 rounded-full bg-slate-800 text-white text-xs font-bold shadow-md"
        >
          {commonT.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 pb-28 animate-in fade-in duration-300">
      {/* Top Meta Bar: Hijri Date & Location */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {hijri && (
          <div 
            className={`
              flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-xl
              ${isDarkMode 
                ? 'bg-slate-900/60 border-slate-800 text-amber-400' 
                : 'bg-white/70 border-white/70 text-amber-600 shadow-sm'
              }
            `}
          >
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{hijri}</span>
          </div>
        )}

        <div className="flex items-center gap-1 opacity-60 text-xs font-semibold">
          <MapPin size={13} />
          <span className="truncate max-w-[120px]">{locationName}</span>
        </div>
      </div>

      {/* Hero Card: Next Upcoming Prayer */}
      {nextKey && prayers && prayers[nextKey] && (
        <div 
          className={`
            relative overflow-hidden rounded-3xl p-5 shadow-2xl border mb-5 transition-all
            bg-gradient-to-br ${PRAYER_META[nextKey]?.gradient || 'from-emerald-950 to-slate-900'}
            border-emerald-500/30 text-white
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{PRAYER_META[nextKey]?.emoji}</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  {t.nextPrayer}
                </span>
                <h3 className="text-2xl font-black mt-1">
                  {t[nextKey.toLowerCase()]}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black tabular-nums tracking-tight">
                {formatPrayerTime(prayers[nextKey], lang)}
              </span>
              {countdownText && (
                <p className="text-xs font-bold text-emerald-300 mt-0.5">
                  {t.remaining}: {countdownText}
                </p>
              )}
            </div>
          </div>

          {/* Glowing live bar */}
          <div className="w-full h-1.5 bg-black/30 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* 6 Prayer Cards List */}
      <div className="flex flex-col gap-2.5">
        {prayerKeys.map(({ key, label }) => {
          const meta = PRAYER_META[key];
          const time = prayers ? prayers[key] : '--:--';
          const isNext = key === nextKey;
          const isPast = prayers && toMinutes(time) < nowMins && !isNext;

          return (
            <div
              key={key}
              className={`
                p-4 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex items-center justify-between
                ${isNext
                  ? `bg-gradient-to-r ${meta.gradient} border-emerald-500/50 shadow-lg text-white scale-[1.02]`
                  : isPast
                    ? (isDarkMode ? 'bg-slate-900/30 border-slate-800/40 opacity-60' : 'bg-slate-100/50 border-slate-200/50 opacity-60')
                    : (isDarkMode ? 'bg-slate-900/60 border-slate-800/80 text-white' : 'bg-white/70 border-white/70 text-slate-800 shadow-sm')
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{meta.emoji}</span>
                <div>
                  <h4 className="text-sm font-extrabold">{label}</h4>
                  {isNext && (
                    <span className="text-[10px] font-bold text-emerald-400 block">
                      {countdownText ? `${t.remaining} ${countdownText}` : ''}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-lg font-black tabular-nums tracking-tight">
                {formatPrayerTime(time, lang)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Qibla Compass */}
      <QiblaCompass bearingAngle={qiblaAngle} lang={lang} isDarkMode={isDarkMode} />

      {/* Method note */}
      <div className="mt-4 text-center">
        <span className="text-[11px] opacity-40 font-semibold block">
          {t.methods?.habous || t.methods?.mwl}
        </span>
      </div>
    </div>
  );
};
