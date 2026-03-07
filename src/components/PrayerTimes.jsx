import React, { useState, useEffect, useCallback } from 'react';
import { X, MapPin, RefreshCw, Moon, Star } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

// ── Prayer meta ────────────────────────────────────────────────────────────────
const PRAYER_META = {
  Fajr:    { emoji: '🌙', color: 'from-indigo-900 to-slate-900', accent: 'text-indigo-300', border: 'border-indigo-800/50' },
  Sunrise: { emoji: '🌅', color: 'from-orange-800 to-amber-900', accent: 'text-orange-300', border: 'border-orange-800/50' },
  Dhuhr:   { emoji: '☀️', color: 'from-yellow-700 to-orange-800', accent: 'text-yellow-200', border: 'border-yellow-700/50' },
  Asr:     { emoji: '🌤️', color: 'from-sky-700 to-blue-800',    accent: 'text-sky-200',    border: 'border-sky-700/50'    },
  Maghrib: { emoji: '🌇', color: 'from-rose-800 to-purple-900', accent: 'text-rose-300',   border: 'border-rose-800/50'   },
  Isha:    { emoji: '🌌', color: 'from-slate-900 to-indigo-950', accent: 'text-slate-300', border: 'border-slate-700/50'  },
};

const PRAYER_NAMES = {
  en: { Fajr: 'Fajr', Sunrise: 'Sunrise', Dhuhr: 'Dhuhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Isha' },
  ar: { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' },
  ma: { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الضهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشا' },
};

// Convert "HH:MM" to minutes since midnight
const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const nowMinutes = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
};

// Format "HH:MM (24h)" → "HH:MM AM/PM" for EN, keep 24h for AR/MA
const formatTime = (t, lang) => {
  if (!t) return '--:--';
  if (lang !== 'en') return t;
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
};

// Countdown string from now to a prayer time
const countdown = (prayerTime) => {
  const diff = toMinutes(prayerTime) - nowMinutes();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

// UI translations
const T = {
  en: {
    title: 'Prayer Times',
    next: 'Next',
    in: 'in',
    loading: 'Loading prayer times…',
    error: 'Failed to load prayer times.',
    retry: 'Retry',
    method: 'Muslim World League',
    hijri: 'Hijri Date',
  },
  ar: {
    title: 'مواقيت الصلاة',
    next: 'القادمة',
    in: 'بعد',
    loading: 'جاري تحميل مواقيت الصلاة…',
    error: 'فشل تحميل مواقيت الصلاة.',
    retry: 'أعد المحاولة',
    method: 'رابطة العالم الإسلامي',
    hijri: 'التاريخ الهجري',
  },
  ma: {
    title: 'أوقات الصلاة',
    next: 'الجاية',
    in: 'من دبا',
    loading: 'كانجيبو أوقات الصلاة…',
    error: 'ماقدرناش نجيبو أوقات الصلاة.',
    retry: 'عاود جرب',
    method: 'رابطة العالم الإسلامي',
    hijri: 'التاريخ الهجري',
  },
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const PrayerTimesPage = ({ onClose, lat, lon, locationName, lang, isDarkMode }) => {
  const [prayers, setPrayers] = useState(null);
  const [hijri, setHijri]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [now, setNow]         = useState(nowMinutes());

  const t  = T[lang] || T.en;
  const pn = PRAYER_NAMES[lang] || PRAYER_NAMES.en;

  // Tick every minute to update countdown + highlight
  useEffect(() => {
    const id = setInterval(() => setNow(nowMinutes()), 60_000);
    return () => clearInterval(id);
  }, []);

  const fetchPrayers = useCallback(async () => {
    if (!lat || !lon) return;
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      // Method 3 = Muslim World League
      const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}`
        + `?latitude=${lat}&longitude=${lon}&method=3`;

      const res  = await fetch(url);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();

      const raw = data.data.timings;
      // Only the 6 main prayers
      setPrayers({
        Fajr:    raw.Fajr,
        Sunrise: raw.Sunrise,
        Dhuhr:   raw.Dhuhr,
        Asr:     raw.Asr,
        Maghrib: raw.Maghrib,
        Isha:    raw.Isha,
      });

      const h = data.data.date.hijri;
      setHijri(`${h.day} ${h.month.ar} ${h.year}`);
    } catch (e) {
      console.error(e);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [lat, lon, t.error]);

  useEffect(() => { fetchPrayers(); }, [fetchPrayers]);

  // Find next prayer
  const nextPrayer = prayers
    ? Object.entries(prayers).find(([, time]) => toMinutes(time) > now)?.[0]
    : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col animate-in fade-in"
      style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      {/* ── Header ── */}
      <div className={`flex items-center justify-between px-6 pt-10 pb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
        <div>
          <h1 className="text-2xl font-black tracking-tight">{t.title}</h1>
          <div className="flex items-center gap-1 mt-1 opacity-60">
            <MapPin size={12} />
            <span className="text-xs font-medium">{locationName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchPrayers}
            className={`p-2 rounded-full border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={onClose}
            className={`p-2 rounded-full border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── Hijri date ── */}
      {hijri && (
        <div className={`mx-6 mb-4 px-4 py-2 rounded-2xl flex items-center gap-2 ${isDarkMode ? 'bg-slate-800/60 text-slate-300' : 'bg-white text-slate-600'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <Star size={14} className="text-yellow-400" />
          <span className="text-sm font-semibold">{t.hijri}: {hijri}</span>
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto px-6 pb-10">

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Moon size={40} className={`animate-pulse ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.loading}</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{error}</p>
            <button onClick={fetchPrayers}
              className={`px-5 py-2 rounded-full text-sm font-bold ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'}`}>
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && prayers && (
          <div className="flex flex-col gap-3">
            {Object.entries(prayers).map(([key, time]) => {
              const meta      = PRAYER_META[key];
              const isNext    = key === nextPrayer;
              const isPast    = toMinutes(time) < now && key !== nextPrayer;
              const cdText    = isNext ? countdown(time) : null;

              return (
                <div key={key}
                  className={`
                    relative overflow-hidden rounded-3xl border transition-all duration-300
                    ${isNext
                      ? `bg-gradient-to-r ${meta.color} border-transparent shadow-xl scale-[1.02]`
                      : isPast
                        ? (isDarkMode ? 'bg-slate-800/30 border-slate-700/40' : 'bg-slate-100 border-slate-200')
                        : (isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-white border-slate-200')
                    }
                  `}
                >
                  <div className="flex items-center justify-between px-5 py-4">
                    {/* Left: emoji + name */}
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${isPast && !isNext ? 'opacity-30' : ''}`}>
                        {meta.emoji}
                      </span>
                      <div>
                        <p className={`font-bold text-base leading-tight
                          ${isNext ? 'text-white' : isPast
                            ? (isDarkMode ? 'text-slate-500' : 'text-slate-400')
                            : (isDarkMode ? 'text-white' : 'text-slate-800')
                          }`}>
                          {pn[key]}
                        </p>
                        {isNext && cdText && (
                          <p className={`text-xs font-semibold mt-0.5 ${meta.accent}`}>
                            {t.in} {cdText}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: time + NEXT badge */}
                    <div className="flex items-center gap-3">
                      {isNext && (
                        <span className="text-xs font-black uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full">
                          {t.next}
                        </span>
                      )}
                      <p className={`text-xl font-black tabular-nums tracking-tight
                        ${isNext ? 'text-white' : isPast
                          ? (isDarkMode ? 'text-slate-600' : 'text-slate-300')
                          : (isDarkMode ? 'text-white' : 'text-slate-800')
                        }`}>
                        {formatTime(time, lang)}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar for current prayer */}
                  {isNext && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                      <div
                        className="h-full bg-white/40 transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, ((now - (toMinutes(time) - 60)) / 60) * 100)}%`
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Method badge */}
            <div className={`mt-2 text-center text-xs opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
              {t.method}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
