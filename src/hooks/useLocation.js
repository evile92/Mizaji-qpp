import { useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS } from '../constants/translations';

// Popular Moroccan & International city presets
export const POPULAR_CITIES = [
  { name: 'Tetouan', nameAr: 'تطوان', nameMa: 'تطوان', country: 'Morocco', countryAr: 'المغرب', lat: 35.5785, lon: -5.3684 },
  { name: 'Tangier', nameAr: 'طنجة', nameMa: 'طنجة', country: 'Morocco', countryAr: 'المغرب', lat: 35.7595, lon: -5.8340 },
  { name: 'Casablanca', nameAr: 'الدار البيضاء', nameMa: 'كازا', country: 'Morocco', countryAr: 'المغرب', lat: 33.5731, lon: -7.5898 },
  { name: 'Rabat', nameAr: 'الرباط', nameMa: 'الرباط', country: 'Morocco', countryAr: 'المغرب', lat: 34.0209, lon: -6.8416 },
  { name: 'Marrakech', nameAr: 'مراكش', nameMa: 'مراكش', country: 'Morocco', countryAr: 'المغرب', lat: 31.6295, lon: -7.9811 },
  { name: 'Fez', nameAr: 'فاس', nameMa: 'فاس', country: 'Morocco', countryAr: 'المغرب', lat: 34.0181, lon: -5.0078 },
  { name: 'Agadir', nameAr: 'أكادير', nameMa: 'أكادير', country: 'Morocco', countryAr: 'المغرب', lat: 30.4278, lon: -9.5981 },
  { name: 'Oujda', nameAr: 'وجدة', nameMa: 'وجدة', country: 'Morocco', countryAr: 'المغرب', lat: 34.6867, lon: -1.9114 },
  { name: 'Riyadh', nameAr: 'الرياض', nameMa: 'الرياض', country: 'Saudi Arabia', countryAr: 'السعودية', lat: 24.7136, lon: 46.6753 },
  { name: 'Cairo', nameAr: 'القاهرة', nameMa: 'القاهرة', country: 'Egypt', countryAr: 'مصر', lat: 30.0444, lon: 31.2357 },
  { name: 'Dubai', nameAr: 'دبي', nameMa: 'دبي', country: 'UAE', countryAr: 'الإمارات', lat: 25.2048, lon: 55.2708 },
  { name: 'Paris', nameAr: 'باريس', nameMa: 'باريس', country: 'France', countryAr: 'فرنسا', lat: 48.8566, lon: 2.3522 },
  { name: 'Madrid', nameAr: 'مدريد', nameMa: 'مدريد', country: 'Spain', countryAr: 'إسبانيا', lat: 40.4168, lon: -3.7038 },
  { name: 'London', nameAr: 'لندن', nameMa: 'لندن', country: 'UK', countryAr: 'بريطانيا', lat: 51.5074, lon: -0.1278 },
];

const DEFAULT_LOCATION = POPULAR_CITIES[0]; // Tetouan
const FAVORITES_KEY = 'mizaji_favorites';
const RECENT_KEY = 'mizaji_recent_cities';
const MAX_RECENT_CITIES = 5;

const readStoredList = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeStoredList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // ignore storage quota errors
  }
};

const isSameCity = (a, b) => {
  if (!a || !b) return false;
  return Math.abs(Number(a.lat) - Number(b.lat)) < 0.02 && Math.abs(Number(a.lon) - Number(b.lon)) < 0.02;
};

export const useLocation = (lang = 'en') => {
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('mizaji_location');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_LOCATION;
  });

  const [favorites, setFavorites] = useState(() => readStoredList(FAVORITES_KEY));
  const [recentCities, setRecentCities] = useState(() => readStoredList(RECENT_KEY));
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Reverse geocoding helper to resolve city name from latitude & longitude
  const reverseGeocode = useCallback(async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${lang === 'en' ? 'en' : 'ar'}`
      );
      if (res.ok) {
        const data = await res.json();
        const city = data.city || data.locality || data.principalSubdivision || 'Current Location';
        const country = data.countryName || '';
        return { city, country };
      }
    } catch (e) {
      console.warn('Reverse geocode fallback:', e);
    }
    return { city: TRANSLATIONS[lang]?.yourLocation || 'Current Location', country: '' };
  }, [lang]);

  // Request user GPS location
  const detectGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      return;
    }
    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const geoInfo = await reverseGeocode(lat, lon);

        const newLoc = {
          name: geoInfo.city,
          nameAr: geoInfo.city,
          nameMa: geoInfo.city,
          country: geoInfo.country,
          countryAr: geoInfo.country,
          lat,
          lon,
          isGps: true,
        };

        setLocation(newLoc);
        setIsGpsActive(true);
        setIsDetecting(false);
        try {
          localStorage.setItem('mizaji_location', JSON.stringify(newLoc));
        } catch (e) {
          // ignore
        }
      },
      (err) => {
        console.warn('Geolocation denied or failed:', err);
        setIsDetecting(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [reverseGeocode]);

  // Set specific city from search, favorites, recent, or popular list
  const selectCity = useCallback((cityObj) => {
    const newLoc = {
      ...cityObj,
      isGps: false,
    };
    setLocation(newLoc);
    setIsGpsActive(false);
    try {
      localStorage.setItem('mizaji_location', JSON.stringify(newLoc));
    } catch (e) {
      // ignore
    }

    setRecentCities((prev) => {
      const updated = [newLoc, ...prev.filter((c) => !isSameCity(c, newLoc))].slice(0, MAX_RECENT_CITIES);
      writeStoredList(RECENT_KEY, updated);
      return updated;
    });
  }, []);

  // Pin or unpin a favorite city
  const toggleFavorite = useCallback((cityObj) => {
    if (!cityObj) return;
    setFavorites((prev) => {
      const exists = prev.some((c) => isSameCity(c, cityObj));
      const updated = exists
        ? prev.filter((c) => !isSameCity(c, cityObj))
        : [{ ...cityObj, isGps: false }, ...prev];
      writeStoredList(FAVORITES_KEY, updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback((cityObj) => {
    return favorites.some((c) => isSameCity(c, cityObj));
  }, [favorites]);

  // Search cities via Open-Meteo Geocoding API
  const searchCities = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults((prev) => (prev.length === 0 ? prev : []));
      return;
    }
    setIsSearching(true);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=10&language=${lang === 'en' ? 'en' : 'ar'}&format=json`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const mapped = data.results.map((r) => ({
            name: r.name,
            nameAr: r.name,
            nameMa: r.name,
            country: r.country || '',
            countryAr: r.country || '',
            admin1: r.admin1 || '',
            lat: r.latitude,
            lon: r.longitude,
          }));
          setSearchResults(mapped);
        } else {
          setSearchResults([]);
        }
      }
    } catch (e) {
      console.error('City search error:', e);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [lang]);

  // Format current location name for display in active language
  const getLocationDisplayName = () => {
    if (!location) return '';
    if (lang === 'ar') return location.nameAr || location.name;
    if (lang === 'ma') return location.nameMa || location.nameAr || location.name;
    return location.name;
  };

  return {
    location,
    displayName: getLocationDisplayName(),
    isGpsActive,
    isDetecting,
    detectGpsLocation,
    selectCity,
    searchCities,
    searchResults,
    isSearching,
    popularCities: POPULAR_CITIES,
    favorites,
    recentCities,
    toggleFavorite,
    isFavorite,
  };
};
