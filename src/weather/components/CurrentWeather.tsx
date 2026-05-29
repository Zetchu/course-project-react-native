import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { Card } from '../../shared';
import {
  fetchCurrentWeather,
  Location,
  CurrentWeatherData,
} from '../services/weatherService';
import { useCurrentLocation } from '../useCurrentLocation';

const CurrentWeather: React.FC<{ location?: Location }> = ({
  location: propLocation,
}) => {
  const deviceLocation = useCurrentLocation();
  // Use the passed location (e.g., from the Favorites screen) or fallback to GPS
  const location = propLocation ?? deviceLocation;

  const [data, setData] = useState<CurrentWeatherData>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadWeather = async (manualRefresh = false) => {
    if (!location) return;

    if (manualRefresh) {
      setIsRefreshing(true);
      // Give immediate light tactile feedback when the user taps to refresh
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      const weatherData = await fetchCurrentWeather(location);
      setData(weatherData);

      if (manualRefresh) {
        // Vibrate with a success pattern when the data finishes loading
        void Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
    } catch (error) {
      console.error(error);
      if (manualRefresh) {
        // Vibrate with an error pattern if the fetch fails
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadWeather();
  }, [location]);

  // Show a loading state while waiting for GPS coordinates
  if (!location) {
    return (
      <Card>
        <View style={[styles.current, { paddingVertical: 40 }]}>
          <ActivityIndicator
            size='large'
            color='#0f172a'
          />
          <Text style={styles.loadingText}>Locating device...</Text>
        </View>
      </Card>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => loadWeather(true)}
    >
      <Card>
        <View style={styles.current}>
          <Text style={styles.temperature}>{data?.temperature ?? '--'}°C</Text>
          <Text style={styles.location}>
            {location.name} {propLocation ? '' : '(Current)'}
          </Text>
          <Text style={styles.condition}>
            {isRefreshing ? 'Refreshing...' : (data?.condition ?? '--')}
          </Text>
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
    </TouchableOpacity>
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
  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontWeight: '500',
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
