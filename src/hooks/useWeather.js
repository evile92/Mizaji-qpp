import { useState, useEffect, useCallback, useMemo } from 'react';
import { TRANSLATIONS } from '../constants/translations';
import { getWeatherMood, degreesToCompass } from '../utils/weatherHelpers';

const summarizeDayFromHourly = (dayHours) => {
  if (!dayHours || dayHours.length === 0) {
    return { humidity: 50, wind: 10, windDirectionDeg: null, pressure: 1013, visibility: null };
  }
  const daytime = dayHours.filter((h) => h.hour >= 10 && h.hour <= 16);
  const sample = daytime.length > 0 ? daytime : dayHours;

  const averageField = (items, key) => {
    const valid = items.map((item) => item[key]).filter((v) => v !== null && v !== undefined && !Number.isNaN(v));
    if (valid.length === 0) return null;
    return valid.reduce((sum, v) => sum + v, 0) / valid.length;
  };

  const midPoint = sample[Math.floor(sample.length / 2)];
  return {
    humidity: Math.round(averageField(dayHours, 'humidity') ?? 50),
    wind: Math.round(averageField(sample, 'wind') ?? 10),
    windDirectionDeg: midPoint?.windDirection ?? null,
    pressure: Math.round(averageField(dayHours, 'pressure') ?? 1013),
    visibility: averageField(sample, 'visibility'),
  };
};

const mapHourlyEntry = (raw, index) => {
  const d = new Date(raw.time[index]);
  return {
    time: raw.time[index],
    hour: d.getHours(),
    temp: raw.temperature_2m[index],
    feelsLike: raw.apparent_temperature[index],
    humidity: raw.relative_humidity_2m?.[index] ?? null,
    wind: raw.wind_speed_10m?.[index] ?? null,
    windDirection: raw.wind_direction_10m?.[index] ?? null,
    pressure: raw.surface_pressure?.[index] ?? null,
    visibility: raw.visibility?.[index] ?? null,
    code: raw.weather_code[index],
    precip: raw.precipitation_probability[index] ?? 0,
    precipAmount: raw.precipitation[index] ?? 0,
    uv: raw.uv_index[index] ?? 0,
  };
};

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
    if (lat === undefined || lat === null || lon === undefined || lon === null) return;
    setLoading(true);
    setError(null);

    try {
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
        + `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,winddirection_10m,surface_pressure,uv_index,visibility`
        + `&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index`
        + `&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max`
        + `&past_days=2&forecast_days=5&timezone=auto`;

      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}`
        + `&current=european_aqi,us_aqi,pm2_5,pm10`;

      const [res, aqiRes] = await Promise.all([
        fetch(forecastUrl),
        fetch(aqiUrl).catch(() => null),
      ]);

      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      if (data.error) throw new Error(data.reason);

      let airQuality = null;
      if (aqiRes && aqiRes.ok) {
        try {
          const aqiJson = await aqiRes.json();
          if (aqiJson?.current) {
            airQuality = {
              aqi: aqiJson.current.european_aqi ?? null,
              usAqi: aqiJson.current.us_aqi ?? null,
              pm25: aqiJson.current.pm2_5 ?? null,
              pm10: aqiJson.current.pm10 ?? null,
            };
          }
        } catch {
          // AQI is supplemental; ignore parse errors
        }
      }

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
          visibility: data.current.visibility ?? null,
          code: data.current.weather_code,
        },
        airQuality,
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
        dayHours.push(mapHourlyEntry(raw, i));
      }
    }

    // Fallback if date matching had timezone drift
    if (dayHours.length === 0) {
      const startIdx = selectedDayIndex * 24;
      for (let i = 0; i < 24 && (startIdx + i) < raw.time.length; i++) {
        dayHours.push(mapHourlyEntry(raw, startIdx + i));
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
    const summary = isToday ? null : summarizeDayFromHourly(selectedDayHourly);

    return {
      isToday,
      temp: isToday ? weatherData.current.temp : day.tempMax,
      tempMax: day.tempMax,
      tempMin: day.tempMin,
      feelsLike: isToday ? weatherData.current.feelsLike : day.feelsLikeMax,
      yesterdayTempMax: yesterday?.tempMax,
      tempDiffFromYesterday: yesterday ? weatherData.current.temp - yesterday.tempMax : 0,
      humidity: isToday ? weatherData.current.humidity : summary.humidity,
      wind: isToday ? weatherData.current.wind : summary.wind,
      windDirection: isToday
        ? degreesToCompass(weatherData.current.windDirection, lang)
        : degreesToCompass(summary.windDirectionDeg, lang),
      pressure: isToday ? weatherData.current.pressure : summary.pressure,
      uvIndex: isToday ? weatherData.current.uvIndex : day.uvMax,
      visibility: isToday ? weatherData.current.visibility : summary.visibility,
      aqi: isToday ? (weatherData.airQuality?.aqi ?? null) : null,
      pm25: isToday ? (weatherData.airQuality?.pm25 ?? null) : null,
      pm10: isToday ? (weatherData.airQuality?.pm10 ?? null) : null,
      precipProb: day.precipProb,
      precipSum: day.precipSum,
      sunrise: day.sunrise ? new Date(day.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: lang === 'en' }) : '--:--',
      sunset: day.sunset ? new Date(day.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: lang === 'en' }) : '--:--',
      conditionCode: isToday ? weatherData.current.code : day.code,
      date: day.time,
    };
  }, [weatherData, selectedDayIndex, selectedDayHourly, lang]);

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
