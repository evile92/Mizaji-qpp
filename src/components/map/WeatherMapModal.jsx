import React, { useState } from 'react';
import { X, Layers, Wind, CloudRain, Thermometer, Cloud } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const WeatherMapModal = ({
  isOpen,
  onClose,
  lat,
  lon,
  locationName,
  lang,
  isDarkMode,
}) => {
  const [overlay, setOverlay] = useState('wind'); // 'wind', 'rain', 'temp', 'clouds'
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=8&level=surface&overlay=${overlay}&product=ecmwf&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;

  const layers = [
    { id: 'wind', label: t.wind, icon: Wind },
    { id: 'rain', label: t.precipitation, icon: CloudRain },
    { id: 'temp', label: t.feelsLike, icon: Thermometer },
    { id: 'clouds', label: lang === 'en' ? 'Clouds' : 'السحب', icon: Cloud },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`
          relative w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl border flex flex-col
          ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}
        `}
      >
        {/* Top Header Controls */}
        <div className="p-3 sm:p-4 flex items-center justify-between gap-2 border-b border-slate-500/20">
          <div className="flex items-center gap-2 truncate">
            <Layers size={18} className="text-blue-500 flex-shrink-0" />
            <h3 className="text-sm font-black truncate">{t.mapTitle} - {locationName}</h3>
          </div>

          {/* Layer Selector */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {layers.map((l) => {
              const LIcon = l.icon;
              const isSelected = overlay === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setOverlay(l.id)}
                  className={`
                    flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all
                    ${isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }
                  `}
                >
                  <LIcon size={13} />
                  <span className="hidden sm:inline">{l.label}</span>
                </button>
              );
            })}

            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 ml-1 rounded-full hover:bg-slate-500/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Map iframe */}
        <div className="flex-1 w-full h-full relative">
          <iframe
            title="Weather Radar Map"
            width="100%"
            height="100%"
            src={mapUrl}
            frameBorder="0"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
