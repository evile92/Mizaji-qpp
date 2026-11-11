import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Navigation, Loader2, Building2, Star, History } from 'lucide-react';
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
  favorites = [],
  recentCities = [],
  onToggleFavorite,
  isFavorite,
  lang,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    if (query.trim().length < 2) {
      onSearch('');
      return undefined;
    }
    const timer = setTimeout(() => {
      onSearch(query);
    }, 350);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  if (!isOpen) return null;

  const getCityLabel = (c) => {
    if (lang === 'ar') return c.nameAr || c.name;
    if (lang === 'ma') return c.nameMa || c.nameAr || c.name;
    return c.name;
  };

  const getCountryLabel = (c) => (lang === 'en' ? c.country : (c.countryAr || c.country));

  const renderCityGridSection = (title, cities, iconNode) => {
    if (!cities || cities.length === 0) return null;
    return (
      <div className="mb-4 last:mb-0">
        <div className={`flex items-center gap-1.5 text-[11px] font-bold px-1 mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {iconNode}
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {cities.map((c) => {
            const starred = isFavorite ? isFavorite(c) : false;
            return (
              <div
                key={`${c.name}-${c.lat}-${c.lon}`}
                className={`
                  p-2.5 rounded-2xl flex items-center justify-between gap-1.5 transition-all
                  ${isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80' 
                    : 'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200'
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectCity(c);
                    onClose();
                  }}
                  className="flex items-center gap-2 min-w-0 flex-1 text-start"
                >
                  <MapPin size={14} className="text-amber-500 flex-shrink-0" />
                  <div className="truncate">
                    <p className={`text-xs font-extrabold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {getCityLabel(c)}
                    </p>
                    <p className={`text-[10px] font-medium truncate ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {getCountryLabel(c)}
                    </p>
                  </div>
                </button>
                {onToggleFavorite && (
                  <button
                    type="button"
                    aria-label="Toggle Favorite"
                    onClick={() => onToggleFavorite(c)}
                    className="p-1 rounded-full hover:bg-amber-500/15 transition-colors flex-shrink-0"
                  >
                    <Star
                      size={14}
                      className={starred ? 'fill-amber-400 text-amber-400' : 'opacity-40 hover:opacity-80'}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
              {searchResults.map((city, idx) => {
                const starred = isFavorite ? isFavorite(city) : false;
                return (
                  <div
                    key={`${city.name}-${idx}`}
                    className={`
                      w-full p-2.5 rounded-2xl flex items-center justify-between gap-2 transition-colors
                      ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}
                    `}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCity(city);
                        onClose();
                      }}
                      className="flex items-center gap-3 flex-1 min-w-0 text-start"
                    >
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0">
                        <Building2 size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">{city.name}</p>
                        <p className="text-[11px] opacity-60 font-medium truncate">
                          {[city.admin1, city.country].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs opacity-40 font-mono">
                        {city.lat.toFixed(2)}°, {city.lon.toFixed(2)}°
                      </span>
                      {onToggleFavorite && (
                        <button
                          type="button"
                          aria-label="Toggle Favorite"
                          onClick={() => onToggleFavorite(city)}
                          className="p-1.5 rounded-full hover:bg-amber-500/15 transition-colors"
                        >
                          <Star
                            size={15}
                            className={starred ? 'fill-amber-400 text-amber-400' : 'opacity-40 hover:opacity-80'}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : query.trim().length >= 2 && !isSearching ? (
            <div className="py-8 text-center opacity-50 text-xs font-semibold">
              {t.noResultsFound}
            </div>
          ) : (
            <div>
              {renderCityGridSection(t.favorites, favorites, <Star size={12} className="fill-amber-400 text-amber-400" />)}
              {renderCityGridSection(t.recentCities, recentCities, <History size={12} className="text-blue-400" />)}
              {renderCityGridSection(t.popularCities, popularCities, <MapPin size={12} className="text-amber-500" />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
