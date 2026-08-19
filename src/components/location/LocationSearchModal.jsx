import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Navigation, Loader2, Building2 } from 'lucide-react';
import { TRANSLATIONS } from '../../constants/translations';

export const LocationSearchModal = ({
  isOpen,
  onClose,
  onSelectCity,
  onUseGps,
  onSearch,
  searchResults,
  isSearching,
  popularCities,
  lang,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        onSearch(query);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`
          w-full max-w-lg rounded-3xl p-5 shadow-2xl border flex flex-col max-h-[85vh] transition-all
          ${isDarkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200 text-slate-900'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-500/20">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            <h3 className="text-sm font-extrabold">{t.searchCity}</h3>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full hover:bg-slate-500/20 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mt-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className={`
              w-full pl-10 pr-10 py-3 rounded-2xl text-sm font-semibold outline-none border transition-all
              ${isDarkMode 
                ? 'bg-slate-800/80 border-slate-700 focus:border-blue-500 text-white placeholder-slate-500' 
                : 'bg-slate-100 border-slate-200 focus:border-blue-500 text-slate-900 placeholder-slate-400'
              }
            `}
          />
          {isSearching ? (
            <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-blue-500" />
          ) : query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full opacity-50 hover:opacity-100"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>

        {/* GPS Button */}
        <button
          onClick={() => {
            onUseGps();
            onClose();
          }}
          className={`
            mt-3 flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all
            ${isDarkMode 
              ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
            }
          `}
        >
          <Navigation size={15} />
          <span>{t.useCurrentLocation}</span>
        </button>

        {/* Results / Popular Cities Container */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1 scrollbar-none">
          {searchResults && searchResults.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold opacity-50 px-1 mb-1">
                {lang === 'en' ? 'Search Results' : 'نتائج البحث'}
              </span>
              {searchResults.map((city, idx) => (
                <button
                  key={`${city.name}-${idx}`}
                  onClick={() => {
                    onSelectCity(city);
                    onClose();
                  }}
                  className={`
                    w-full p-3 rounded-2xl flex items-center justify-between text-left transition-colors
                    ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{city.name}</p>
                      <p className="text-[11px] opacity-60 font-medium">
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs opacity-40 font-mono">
                    {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                  </span>
                </button>
              ))}
            </div>
          ) : query.trim().length >= 2 && !isSearching ? (
            <div className="py-8 text-center opacity-50 text-xs font-semibold">
              {t.noResultsFound}
            </div>
          ) : (
            <div>
              <span className={`text-[11px] font-bold px-1 block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.popularCities}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {popularCities.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      onSelectCity(c);
                      onClose();
                    }}
                    className={`
                      p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left
                      ${isDarkMode 
                        ? 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80' 
                        : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200'
                      }
                    `}
                  >
                    <MapPin size={14} className="text-amber-500 flex-shrink-0" />
                    <div className="truncate">
                      <p className={`text-xs font-extrabold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'ar' ? c.nameAr : lang === 'ma' ? c.nameMa : c.name}
                      </p>
                      <p className={`text-[10px] font-medium truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {lang === 'en' ? c.country : c.countryAr}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
