import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  fetchWeatherForecast,
  Location,
  ForecastDayData,
} from "../services/weatherService";
import { Card } from "#shared";

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
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.condition}>{condition}</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.temperatureMax}>{temperatureMax}°</Text>
              <Text style={styles.temperatureMin}>{temperatureMin}°</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  days: { flexGrow: 0, flexDirection: "row" },
  day: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    minWidth: 80,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  condition: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 8,
  },
  tempContainer: { flexDirection: "row", gap: 8 },
  temperatureMax: { fontSize: 16, fontWeight: "bold", color: "#0f172a" },
  temperatureMin: { fontSize: 16, color: "#94a3b8" },
});
