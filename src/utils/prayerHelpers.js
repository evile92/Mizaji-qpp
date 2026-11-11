// Kaaba Coordinates
const KAABA_LAT = 21.422487;
const KAABA_LON = 39.826206;

// Supported Aladhan calculation methods (single source of truth for UI and hook)
export const CALCULATION_METHODS = [
  { id: 21, key: 'habous' },
  { id: 3, key: 'mwl' },
  { id: 4, key: 'makkah' },
  { id: 5, key: 'egypt' },
];

// Convert "HH:MM" (e.g. "05:42") to minutes since midnight
export const toMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.trim().split(':');
  if (parts.length < 2) return 0;
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h * 60 + m;
};

/**
 * Current time in minutes since midnight for an optional IANA timezone.
 */
export const getNowMinutes = (timeZone) => {
  const d = new Date();
  if (timeZone) {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(d);
      const h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '', 10);
      const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '', 10);
      if (!Number.isNaN(h) && !Number.isNaN(m)) {
        return (h % 24) * 60 + m;
      }
    } catch {
      // Fallback to local clock if timezone is unsupported
    }
  }
  return d.getHours() * 60 + d.getMinutes();
};

/**
 * Current YYYY-MM-DD key in the target timezone (or browser local clock).
 */
export const getDateKeyInTimeZone = (timeZone) => {
  const d = new Date();
  if (timeZone) {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(d);
    } catch {
      // Fallback to local date
    }
  }
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Format "HH:MM" (24h) -> 12h for EN with AM/PM, 24h for AR/MA
export const formatPrayerTime = (timeStr, lang = 'en') => {
  if (!timeStr) return '--:--';
  const clean = timeStr.trim().split(' ')[0]; // Strip timezone notes if present
  if (lang !== 'en') return clean;
  
  const [hStr, mStr] = clean.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return timeStr;

  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${String(m).padStart(2, '0')} ${ampm}`;
};

// Calculate next prayer with rollover to tomorrow's Fajr if all prayers for today passed
export const calculateNextPrayer = (prayers, nowMinutes) => {
  if (!prayers) return { nextKey: null, isTomorrow: false, remainingMinutes: 0 };

  const prayerKeys = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  
  // Find first prayer today whose time > now
  for (const key of prayerKeys) {
    const pTime = prayers[key];
    if (pTime) {
      const pMins = toMinutes(pTime);
      if (pMins > nowMinutes) {
        return {
          nextKey: key,
          isTomorrow: false,
          remainingMinutes: pMins - nowMinutes,
        };
      }
    }
  }

  // If now is past Isha, the next prayer is Tomorrow's Fajr!
  const fajrMins = toMinutes(prayers.Fajr || '05:00');
  const minutesUntilMidnight = 24 * 60 - nowMinutes;
  const remainingMinutes = minutesUntilMidnight + fajrMins;

  return {
    nextKey: 'Fajr',
    isTomorrow: true,
    remainingMinutes,
  };
};

// Format remaining countdown time (e.g. "2h 45m" / "2 س و 45 د")
export const formatCountdown = (minutes, lang = 'en') => {
  if (minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (lang === 'en') {
    if (h === 0) return `${m}m`;
    return `${h}h ${m}m`;
  }
  if (lang === 'ar' || lang === 'ma') {
    if (h === 0) return `${m} دقيقة`;
    return `${h} س و ${m} د`;
  }
  return `${h}h ${m}m`;
};

// Calculate Great-Circle Qibla Direction (Bearing from true North 0°-360°)
export const calculateQiblaBearing = (lat, lon) => {
  if (!lat || !lon) return 0;

  const phiK = (KAABA_LAT * Math.PI) / 180.0;
  const lambdaK = (KAABA_LON * Math.PI) / 180.0;
  const phi = (lat * Math.PI) / 180.0;
  const lambda = (lon * Math.PI) / 180.0;

  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );

  return Math.round((psi + 360) % 360);
};

// Prayer UI metadata & gradient themes
export const PRAYER_META = {
  Fajr: {
    emoji: '🌙',
    gradient: 'from-indigo-950 via-slate-900 to-slate-950',
    accent: 'text-indigo-400',
    border: 'border-indigo-800/40',
    glow: 'rgba(99,102,241,0.2)',
  },
  Sunrise: {
    emoji: '🌅',
    gradient: 'from-amber-950 via-orange-900 to-slate-900',
    accent: 'text-amber-300',
    border: 'border-amber-700/40',
    glow: 'rgba(245,158,11,0.2)',
  },
  Dhuhr: {
    emoji: '☀️',
    gradient: 'from-yellow-900 via-amber-800 to-slate-900',
    accent: 'text-yellow-300',
    border: 'border-yellow-600/40',
    glow: 'rgba(234,179,8,0.2)',
  },
  Asr: {
    emoji: '🌤️',
    gradient: 'from-sky-950 via-blue-900 to-slate-900',
    accent: 'text-sky-300',
    border: 'border-sky-700/40',
    glow: 'rgba(14,165,233,0.2)',
  },
  Maghrib: {
    emoji: '🌇',
    gradient: 'from-rose-950 via-purple-900 to-slate-900',
    accent: 'text-rose-300',
    border: 'border-rose-700/40',
    glow: 'rgba(244,63,94,0.2)',
  },
  Isha: {
    emoji: '🌌',
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    accent: 'text-indigo-300',
    border: 'border-slate-700/40',
    glow: 'rgba(99,102,241,0.15)',
  },
};
