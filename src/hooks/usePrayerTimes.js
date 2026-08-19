import { useState, useEffect, useCallback, useMemo } from 'react';
import { TRANSLATIONS } from '../constants/translations';
import { 
  getNowMinutes, 
  calculateNextPrayer, 
  calculateQiblaBearing 
} from '../utils/prayerHelpers';

export const usePrayerTimes = (lat, lon, lang = 'en') => {
  const [prayers, setPrayers] = useState(null);
  const [hijri, setHijri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowMins, setNowMins] = useState(getNowMinutes());
  const [calcMethod, setCalcMethod] = useState(3); // 3 = Muslim World League (MWL), 4 = Makkah, 5 = Egyptian

  // Tick clock every 30 seconds for live countdown accuracy
  useEffect(() => {
    const timer = setInterval(() => {
      setNowMins(getNowMinutes());
    }, 30000);
    return () => clearInterval(timer);
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
    nextPrayerInfo,
    qiblaAngle,
    loading,
    error,
    calcMethod,
    setCalcMethod,
    refreshPrayers: fetchPrayers,
  };
};
