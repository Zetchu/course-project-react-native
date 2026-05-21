export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  condition: number;
  temperature: number;
  wind: number;
  humidity: number;
  uv: number;
}

export interface ForecastDayData {
  day: string;
  temperatureMax: number;
  temperatureMin: number;
  condition: number;
}

/**
 * Fetches the current weather conditions for a given location coordinate.
 */
export async function fetchCurrentWeather(
  location: Location,
): Promise<CurrentWeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch current weather data');
  }

  const data = (await response.json()) as {
    current: {
      weather_code: number;
      temperature_2m: number;
      wind_speed_10m: number;
      relative_humidity_2m: number;
      uv_index: number;
    };
  };

  return {
    condition: data.current.weather_code,
    temperature: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    uv: data.current.uv_index,
  };
}

/**
 * Fetches the daily multi-day weather forecast for a given location coordinate.
 */
export async function fetchWeatherForecast(
  location: Location,
): Promise<ForecastDayData[]> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather forecast data');
  }

  const data = (await response.json()) as {
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
    };
  };

  const forecast: ForecastDayData[] = [];
  for (let i = 0; i < data.daily.time.length; i++) {
    forecast.push({
      day: data.daily.time[i],
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      condition: data.daily.weather_code[i],
    });
  }

  return forecast;
}
