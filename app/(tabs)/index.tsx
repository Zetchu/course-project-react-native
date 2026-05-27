import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentWeather, Forecast, Location } from '#weather';
import { Typography } from '#shared';

export default function WeatherScreen() {
  const location: Location = {
    name: 'Barcelona',
    latitude: 41.3888,
    longitude: 2.159,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Typography
          variant='title'
          style={styles.headerTitle}
        >
          Skycast Dashboard
        </Typography>
        <CurrentWeather location={location} />
        <Forecast location={location} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  headerTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
