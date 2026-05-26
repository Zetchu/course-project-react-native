import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  CurrentWeather,
  Forecast,
  fetchWeather,
  fetchForecast,
} from '#weather';

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true);
        const city = 'Barcelona';
        const current = await fetchWeather(city);
        const forecast = await fetchForecast(city);
        setWeatherData(current);
        setForecastData(forecast);
        setError(null);
      } catch (err) {
        setError('Could not retrieve updated weather metrics.');
      } finally {
        setLoading(false);
      }
    }
    loadWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          size='large'
          color='#0284c7'
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Skycast Dashboard</Text>
        {weatherData && <CurrentWeather data={weatherData} />}
        {forecastData && <Forecast data={forecastData} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { padding: 16 },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  errorText: { color: '#ef4444', fontSize: 16, fontWeight: '500' },
});
