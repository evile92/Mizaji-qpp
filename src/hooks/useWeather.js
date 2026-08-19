import { useState, useEffect, useCallback, useMemo } from 'react';
import { TRANSLATIONS } from '../constants/translations';
import { getWeatherMood, degreesToCompass } from '../utils/weatherHelpers';

export const useWeather = (lat, lon, lang = 'en', isDarkMode = false, personality = 'sarcastic') => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Index 2 is "Today"
  const [roastSeed, setRoastSeed] = useState(0);

  const shuffleRoastQuote = useCallback(() => {
    setRoastSeed((prev) => prev + 1);
  }, []);

  const fetchWeather = useCallback(async () => {
    if (!lat || !lon) return;
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
        + `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,winddirection_10m,surface_pressure,uv_index`
        + `&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,uv_index`
        + `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max`
        + `&past_days=2&forecast_days=5&timezone=auto`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      if (data.error) throw new Error(data.reason);

      // Process Daily Forecast
      const daily = data.daily.time.map((time, i) => ({
        time,
        code: data.daily.weather_code[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        feelsLikeMax: data.daily.apparent_temperature_max?.[i] ?? data.daily.temperature_2m_max[i],
        precipProb: data.daily.precipitation_probability_max?.[i] ?? 0,
        precipSum: data.daily.precipitation_sum?.[i] ?? 0,
        sunrise: data.daily.sunrise?.[i] ?? '',
        sunset: data.daily.sunset?.[i] ?? '',
        uvMax: data.daily.uv_index_max?.[i] ?? 0,
      }));

      // Find index for today (past_days=2 means today is index 2)
      const todayIdx = 2;

      setWeatherData({
        current: {
          temp: data.current.temperature_2m,
          feelsLike: data.current.apparent_temperature ?? data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
          windDirection: data.current.winddirection_10m,
          pressure: Math.round(data.current.surface_pressure ?? 1013),
          uvIndex: data.current.uv_index ?? 0,
          code: data.current.weather_code,
        },
        rawHourly: data.hourly,
        daily,
        todayIndex: todayIdx,
        timezone: data.timezone,
      });
      
      // Default to today
      setSelectedDayIndex(todayIdx);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(TRANSLATIONS[lang]?.fetchError || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, lang]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Selected Day Hourly Forecast (Extracts 24 hours corresponding to the selected day)
  const selectedDayHourly = useMemo(() => {
    if (!weatherData || !weatherData.rawHourly || !weatherData.daily[selectedDayIndex]) {
      return [];
    }

    const selectedDateStr = weatherData.daily[selectedDayIndex].time; // e.g. "2026-08-19"
    const raw = weatherData.rawHourly;
    const dayHours = [];

    for (let i = 0; i < raw.time.length; i++) {
      if (raw.time[i].startsWith(selectedDateStr)) {
        const d = new Date(raw.time[i]);
        dayHours.push({
          time: raw.time[i],
          hour: d.getHours(),
          temp: raw.temperature_2m[i],
          feelsLike: raw.apparent_temperature[i],
          code: raw.weather_code[i],
          precip: raw.precipitation_probability[i] ?? 0,
          precipAmount: raw.precipitation[i] ?? 0,
          uv: raw.uv_index[i] ?? 0,
        });
      }
    }

    // Fallback if date matching had timezone drift
    if (dayHours.length === 0) {
      const startIdx = selectedDayIndex * 24;
      for (let i = 0; i < 24 && (startIdx + i) < raw.time.length; i++) {
        const abs = startIdx + i;
        const d = new Date(raw.time[abs]);
        dayHours.push({
          time: raw.time[abs],
          hour: d.getHours(),
          temp: raw.temperature_2m[abs],
          feelsLike: raw.apparent_temperature[abs],
          code: raw.weather_code[abs],
          precip: raw.precipitation_probability[abs] ?? 0,
          precipAmount: raw.precipitation[abs] ?? 0,
          uv: raw.uv_index[abs] ?? 0,
        });
      }
    }

    return dayHours;
  }, [weatherData, selectedDayIndex]);

  // Active Display Data (Based on selected day vs Today)
  const activeDayData = useMemo(() => {
    if (!weatherData) return null;
    const isToday = selectedDayIndex === weatherData.todayIndex;
    const day = weatherData.daily[selectedDayIndex];
    const yesterday = weatherData.daily[1]; // Yesterday is index 1

    return {
      isToday,
      temp: isToday ? weatherData.current.temp : day.tempMax,
      tempMax: day.tempMax,
      tempMin: day.tempMin,
      feelsLike: isToday ? weatherData.current.feelsLike : day.feelsLikeMax,
      yesterdayTempMax: yesterday?.tempMax,
      tempDiffFromYesterday: yesterday ? Math.round(weatherData.current.temp - yesterday.tempMax) : 0,
      humidity: isToday ? weatherData.current.humidity : 50,
      wind: isToday ? weatherData.current.wind : 10,
      windDirection: isToday ? degreesToCompass(weatherData.current.windDirection, lang) : '-',
      pressure: isToday ? weatherData.current.pressure : 1013,
      uvIndex: isToday ? weatherData.current.uvIndex : day.uvMax,
      precipProb: day.precipProb,
      precipSum: day.precipSum,
      sunrise: day.sunrise ? new Date(day.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: lang === 'en' }) : '--:--',
      sunset: day.sunset ? new Date(day.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: lang === 'en' }) : '--:--',
      conditionCode: isToday ? weatherData.current.code : day.code,
      date: day.time,
    };
  }, [weatherData, selectedDayIndex, lang]);

  // Current Mood Data
  const currentMood = useMemo(() => {
    if (!activeDayData) {
      return getWeatherMood(0, lang, isDarkMode, personality, roastSeed);
    }
    return getWeatherMood(activeDayData.conditionCode, lang, isDarkMode, personality, roastSeed);
  }, [activeDayData, lang, isDarkMode, personality, roastSeed]);

  return {
    weatherData,
    activeDayData,
    currentMood,
    selectedDayHourly,
    selectedDayIndex,
    setSelectedDayIndex,
    loading,
    error,
    refreshWeather: fetchWeather,
    shuffleRoastQuote,
  };
};
