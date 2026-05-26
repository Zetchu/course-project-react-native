import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { CurrentWeather, Forecast } from '#weather';

// Center coordinate for the weather data view
const location = {
  name: 'Barcelona',
  latitude: 41.385063,
  longitude: 2.173404,
};

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      {/* Core components rendering modular, extracted data-fetching logic */}
      <CurrentWeather location={location} />
      <Forecast location={location} />

      <StatusBar style='auto' />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
});
