import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
// Adjust this import path depending on where you saved location.ts
import { getLocation, lookupLocation } from '../shared/location/location';

const STORAGE_KEY = 'cached-location';

export type WeatherLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

export function useCurrentLocation(): WeatherLocation | undefined {
  const [location, setLocation] = useState<WeatherLocation>();

  useEffect(() => {
    void (async () => {
      console.log('📍 === LOCATION FETCH STARTED ===');

      // 1. Try to get the live device location
      console.log('📍 1. Requesting live GPS coordinates...');
      const currentLocation = await getLocation();

      if (currentLocation) {
        console.log('📍 ✅ LIVE GPS SUCCESS:', currentLocation);
        const newLocation: WeatherLocation = {
          name: await lookupLocation('city', currentLocation),
          ...currentLocation,
        };

        setLocation(newLocation);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation));
        return;
      }

      console.log('📍 ❌ LIVE GPS FAILED (returned undefined).');

      // 2. If live location fails, check for a saved location
      console.log('📍 2. Checking local storage for cache...');
      const cachedLocation = await AsyncStorage.getItem(STORAGE_KEY);

      if (cachedLocation) {
        console.log('📍 ✅ CACHED LOCATION FOUND:', cachedLocation);
        setLocation(JSON.parse(cachedLocation) as WeatherLocation);
        return;
      }

      console.log('📍 ❌ NO CACHED LOCATION FOUND.');

      // 3. Ultimate fallback if no GPS and no cache
      console.log('📍 3. ⚠️ USING ULTIMATE FALLBACK (Barcelona)');
      setLocation({
        name: 'Barcelona',
        latitude: 41.385063,
        longitude: 2.173404,
      });
    })();
  }, []);

  return location;
}
