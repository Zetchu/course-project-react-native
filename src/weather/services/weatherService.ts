import toWeather from '../utils/toWeather';

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  condition: string;
  temperature: number;
  wind: number;
  humidity: number;
  uv: number;
}

export interface ForecastDayData {
  day: string;
  temperatureMax: number;
  temperatureMin: number;
  condition: string;
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
    console.warn(
      'Weather API failed, returning fallback data',
      response.status,
    );
    return {
      condition: 'Clear',
      temperature: 25,
      wind: 10,
      humidity: 50,
      uv: 5,
    };
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
    condition: toWeather(data.current.weather_code),
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
    console.warn(
      'Forecast API failed, returning fallback data',
      response.status,
    );
    return [
      {
        day: new Date().toISOString().split('T')[0],
        temperatureMax: 28,
        temperatureMin: 18,
        condition: 'Cloudy',
      },
      {
        day: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        temperatureMax: 26,
        temperatureMin: 17,
        condition: 'Cloudy',
      },
      {
        day: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        temperatureMax: 25,
        temperatureMin: 16,
        condition: 'Overcast',
      },
    ];
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
    let dayStr = data.daily.time[i];
    try {
      const date = new Date(dayStr);
      dayStr = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
        date,
      );
    } catch {}

    forecast.push({
      day: dayStr,
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      condition: toWeather(data.daily.weather_code[i]),
    });
  }

  return forecast;
}
