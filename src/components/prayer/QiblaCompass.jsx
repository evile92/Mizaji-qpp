import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, Navigation } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const QiblaCompass = ({ bearingAngle, lang, isDarkMode }) => {
  const t = TRANSLATIONS[lang]?.prayer || TRANSLATIONS.en.prayer;
  const [isLive, setIsLive] = useState(false);
  const [sensorStatus, setSensorStatus] = useState('idle'); // 'idle' | 'active' | 'unavailable'
  const [displayAngle, setDisplayAngle] = useState(bearingAngle);
  const prevAngleRef = useRef(bearingAngle);

  // Smoothly unwrap needle rotation so crossing 0°/360° never spins backwards
  const updateSmoothAngle = useCallback((target) => {
    const prev = prevAngleRef.current;
    const delta = (((target - (prev % 360)) + 540) % 360) - 180;
    const next = prev + delta;
    prevAngleRef.current = next;
    setDisplayAngle(next);
  }, []);

  useEffect(() => {
    if (!isLive) {
      updateSmoothAngle(bearingAngle);
    }
  }, [bearingAngle, isLive, updateSmoothAngle]);

  useEffect(() => {
    if (!isLive) return undefined;

    let receivedReading = false;

    const handleOrientation = (event) => {
      let heading = null;
      if (typeof event.webkitCompassHeading === 'number' && !Number.isNaN(event.webkitCompassHeading)) {
        heading = event.webkitCompassHeading;
      } else if (typeof event.alpha === 'number' && !Number.isNaN(event.alpha)) {
        heading = (360 - event.alpha) % 360;
      }

      if (heading === null) return;
      receivedReading = true;
      setSensorStatus('active');
      const relativeQibla = (bearingAngle - heading + 360) % 360;
      updateSmoothAngle(relativeQibla);
    };

    const eventName = 'ondeviceorientationabsolute' in window
      ? 'deviceorientationabsolute'
      : 'deviceorientation';
    window.addEventListener(eventName, handleOrientation, true);

    const fallbackTimer = setTimeout(() => {
      if (!receivedReading) {
        setSensorStatus('unavailable');
      }
    }, 1500);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener(eventName, handleOrientation, true);
    };
  }, [isLive, bearingAngle, updateSmoothAngle]);

  const handleToggleLive = async () => {
    if (isLive) {
      setIsLive(false);
      setSensorStatus('idle');
      return;
    }

    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') {
      setSensorStatus('unavailable');
      return;
    }

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') {
          setSensorStatus('unavailable');
          return;
        }
      } catch {
        setSensorStatus('unavailable');
        return;
      }
    }

    setSensorStatus('idle');
    setIsLive(true);
  };

  const statusText = isLive
    ? (sensorStatus === 'unavailable'
        ? t.compassUnavailable
        : sensorStatus === 'active'
          ? t.compassHint
          : `${bearingAngle}° ${t.qiblaDegree}`)
    : (sensorStatus === 'unavailable' ? t.compassUnavailable : `${bearingAngle}° ${t.qiblaDegree}`);

  return (
    <div 
      className={`
        p-4 rounded-3xl backdrop-blur-xl border transition-all flex items-center justify-between gap-3 mt-4
        ${isDarkMode 
          ? 'bg-slate-900/60 border-slate-800/80 text-white' 
          : 'bg-white/70 border-white/70 text-slate-800 shadow-sm'
        }
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-500 flex-shrink-0">
          <Compass size={22} className={isLive && sensorStatus === 'active' ? '' : 'animate-spin-slow'} />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-black uppercase tracking-wider truncate">{t.qiblaTitle}</h4>
          <p className={`text-xs font-semibold mt-0.5 truncate ${sensorStatus === 'unavailable' ? 'text-amber-500' : 'opacity-70'}`}>
            {statusText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        <button
          type="button"
          onClick={handleToggleLive}
          className={`
            flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-extrabold transition-all active:scale-95
            ${isLive
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }
          `}
        >
          <Navigation size={11} />
          <span>{isLive ? t.liveCompass : t.enableLiveCompass}</span>
        </button>

        {/* Visual Mini Compass Rose */}
        <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-emerald-500/5">
          <div 
            className="absolute bottom-1/2 w-1 h-5 bg-gradient-to-t from-transparent to-emerald-500 rounded-full transition-transform duration-300 origin-bottom"
            style={{ transform: `rotate(${displayAngle}deg)` }}
          />
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
        </div>
      </div>
    </div>
  );
};
