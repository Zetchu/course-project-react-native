import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrentWeather, Forecast, useCurrentLocation } from "#shared/weather";
import { Typography } from "#shared";

export default function WeatherScreen() {
  const location = useCurrentLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Typography variant="normal" style={styles.headerTitle}>
          Skycast Dashboard
        </Typography>

        {!location ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0f172a" />
            <Text style={{ marginTop: 12, color: "#64748b" }}>
              Acquiring satellite signal...
            </Text>
          </View>
        ) : (
          <>
            <CurrentWeather location={location} />
            <Forecast location={location} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  headerTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
