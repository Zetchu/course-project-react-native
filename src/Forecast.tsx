import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Card from './Card';
import {
  fetchWeatherForecast,
  Location,
  ForecastDayData,
} from './weatherService';

const Forecast: React.FC<{ location: Location }> = ({ location }) => {
  const [data, setData] = useState<ForecastDayData[]>();

  useEffect(() => {
    void (async () => {
      try {
        const forecastData = await fetchWeatherForecast(location);
        setData(forecastData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [location]);

  return (
    <Card>
      <ScrollView
        horizontal
        style={styles.days}
      >
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View
            key={day}
            style={styles.day}
          >
            <Text style={styles.temperatureMax}>{temperatureMax} C</Text>
            <Text style={styles.temperatureMin}>{temperatureMin} C</Text>
            <Text style={styles.condition}>{condition}</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  temperatureMax: { fontSize: 18 },
  temperatureMin: { fontSize: 14, color: '#888' },
  condition: { fontWeight: 'bold' },
  days: { flexGrow: 0, flexDirection: 'row' },
  day: { flex: 1, alignItems: 'center', marginHorizontal: 16 },
});
