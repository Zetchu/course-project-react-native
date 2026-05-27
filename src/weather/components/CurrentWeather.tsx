import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../../shared';
import {
  fetchCurrentWeather,
  Location,
  CurrentWeatherData,
} from '../services/weatherService';

const CurrentWeather: React.FC<{ location: Location }> = ({ location }) => {
  const [data, setData] = useState<CurrentWeatherData>();

  useEffect(() => {
    void (async () => {
      try {
        const weatherData = await fetchCurrentWeather(location);
        setData(weatherData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [location]);

  return (
    <Card>
      <View style={styles.current}>
        <Text style={styles.temperature}>{data?.temperature ?? '--'}°C</Text>
        <Text style={styles.location}>{location.name}</Text>
        <Text style={styles.condition}>{data?.condition ?? '--'}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {data?.wind.toFixed(0) ?? '--'} km/h
          </Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {data?.humidity.toFixed(0) ?? '--'}%
          </Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{data?.uv.toFixed(0) ?? '--'}</Text>
          <Text style={styles.statLabel}>UV</Text>
        </View>
      </View>
    </Card>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  current: { alignItems: 'center', marginBottom: 24, gap: 4 },
  temperature: { fontSize: 48, fontWeight: 'bold', color: '#0f172a' },
  location: { fontSize: 16, color: '#64748b', fontWeight: '500' },
  condition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginTop: 8,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
});
