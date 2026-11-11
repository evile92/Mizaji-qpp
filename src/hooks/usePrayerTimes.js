import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { TRANSLATIONS } from '../constants/translations';
import {
  CALCULATION_METHODS,
  getNowMinutes,
  getDateKeyInTimeZone,
  toMinutes,
  calculateNextPrayer,
  calculateQiblaBearing,
} from '../utils/prayerHelpers';

const METHOD_STORAGE_KEY = 'mizaji_prayer_method';
const ALERTS_STORAGE_KEY = 'mizaji_athan_alerts';
const ALERT_PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const usePrayerTimes = (lat, lon, lang = 'en', onPrayerArrive) => {
  const [prayers, setPrayers] = useState(null);
  const [hijri, setHijri] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowMins, setNowMins] = useState(() => getNowMinutes());
  const firedAlertsRef = useRef(new Set());

  const [calcMethod, setCalcMethodState] = useState(() => {
    try {
      const saved = parseInt(localStorage.getItem(METHOD_STORAGE_KEY) || '', 10);
      if (CALCULATION_METHODS.some((m) => m.id === saved)) return saved;
    } catch {
      // ignore
    }
    return 21; // Default to Morocco (Habous)
  });

  const [alertsEnabled, setAlertsEnabled] = useState(() => {
    try {
      return localStorage.getItem(ALERTS_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [alertPermission, setAlertPermission] = useState(() => {
    if (typeof Notification === 'undefined') return 'unsupported';
    return Notification.permission;
  });

  const setCalcMethod = useCallback((methodId) => {
    const id = Number(methodId);
    setCalcMethodState(id);
    try {
      localStorage.setItem(METHOD_STORAGE_KEY, String(id));
    } catch {
      // ignore
    }
  }, []);

  const toggleAlerts = useCallback(async () => {
    if (alertsEnabled) {
      setAlertsEnabled(false);
      try {
        localStorage.setItem(ALERTS_STORAGE_KEY, 'false');
      } catch {
        // ignore
      }
      return 'disabled';
    }

    let perm = typeof Notification === 'undefined' ? 'unsupported' : Notification.permission;
    if (typeof Notification !== 'undefined' && perm === 'default') {
      try {
        perm = await Notification.requestPermission();
      } catch {
        perm = 'denied';
      }
    }
    setAlertPermission(perm);

    // Enable in-app chime even if Notification permission is unsupported or denied;
    // UI surfaces permission state clearly when denied.
    setAlertsEnabled(true);
    try {
      localStorage.setItem(ALERTS_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    if (onPrayerArrive) onPrayerArrive();
    return perm;
  }, [alertsEnabled, onPrayerArrive]);

  // Tick clock every 15 seconds in target location timezone
  useEffect(() => {
    setNowMins(getNowMinutes(timezone));
    const timer = setInterval(() => {
      setNowMins(getNowMinutes(timezone));
    }, 15000);
    return () => clearInterval(timer);
  }, [timezone]);

  const fetchPrayers = useCallback(async () => {
    if (lat === undefined || lat === null || lon === undefined || lon === null) return;
    setLoading(true);
    setError(null);

    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lon}&method=${calcMethod}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Prayer API Error');
      const data = await res.json();
      if (!data || !data.data || !data.data.timings) throw new Error('Invalid Prayer Data');

      const raw = data.data.timings;
      setPrayers({
        Fajr: raw.Fajr,
        Sunrise: raw.Sunrise,
        Dhuhr: raw.Dhuhr,
        Asr: raw.Asr,
        Maghrib: raw.Maghrib,
        Isha: raw.Isha,
      });

      const tz = data.data.meta?.timezone || null;
      setTimezone(tz);
      setNowMins(getNowMinutes(tz));

      // Hijri Date Formatting based on active language
      const h = data.data.date.hijri;
      const hijriMonth = lang === 'en' ? (h.month.en || h.month.ar) : h.month.ar;
      setHijri(`${h.day} ${hijriMonth} ${h.year} هـ`);
    } catch (e) {
      console.error('Prayer times fetch error:', e);
      setError(TRANSLATIONS[lang]?.fetchError || 'Failed to fetch prayer times.');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, calcMethod, lang]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  // Trigger prayer chime & browser notification once when a prayer minute arrives
  useEffect(() => {
    if (!alertsEnabled || !prayers) return;
    const dateKey = getDateKeyInTimeZone(timezone);
    const prayerT = TRANSLATIONS[lang]?.prayer || TRANSLATIONS.en.prayer;

    for (const key of ALERT_PRAYER_KEYS) {
      const pTime = prayers[key];
      if (!pTime) continue;
      if (toMinutes(pTime) === nowMins) {
        const alertId = `${dateKey}-${key}`;
        if (firedAlertsRef.current.has(alertId)) continue;
        firedAlertsRef.current.add(alertId);

        if (onPrayerArrive) onPrayerArrive();

        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          const prayerName = prayerT[key.toLowerCase()] || key;
          const body = (prayerT.athanArrived || 'Time for {prayer}').replace('{prayer}', prayerName);
          try {
            new Notification('Mizaji | مزاجي', {
              body,
              icon: '/icon-192.png',
              tag: alertId,
            });
          } catch {
            // Ignore notification errors in restricted contexts
          }
        }
      }
    }
  }, [alertsEnabled, prayers, nowMins, timezone, lang, onPrayerArrive]);

  // Next prayer computation with rollover
  const nextPrayerInfo = useMemo(() => {
    return calculateNextPrayer(prayers, nowMins);
  }, [prayers, nowMins]);

  // Qibla Direction Angle from True North (0-360°)
  const qiblaAngle = useMemo(() => {
    return calculateQiblaBearing(lat, lon);
  }, [lat, lon]);

  return {
    prayers,
    hijri,
    nowMins,
    nextPrayerInfo,
    qiblaAngle,
    loading,
    error,
    calcMethod,
    setCalcMethod,
    alertsEnabled,
    alertPermission,
    toggleAlerts,
    refreshPrayers: fetchPrayers,
  };
};
