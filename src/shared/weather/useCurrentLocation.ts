import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// Adjust this import path depending on where you saved location.ts
import { getLocation, lookupLocation } from "../location/location";

const STORAGE_KEY = "cached-location";

export type WeatherLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

export function useCurrentLocation(): WeatherLocation | undefined {
  const [location, setLocation] = useState<WeatherLocation>();

  useEffect(() => {
    void (async () => {
      // 1. Try to get the live device location
      const currentLocation = await getLocation();

      if (currentLocation) {
        const newLocation: WeatherLocation = {
          name: await lookupLocation("city", currentLocation),
          ...currentLocation,
        };

        setLocation(newLocation);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocation));
        return;
      }

      // 2. If live location fails, check for a saved location
      const cachedLocation = await AsyncStorage.getItem(STORAGE_KEY);

      if (cachedLocation) {
        setLocation(JSON.parse(cachedLocation) as WeatherLocation);
        return;
      }

      // 3. Ultimate fallback if no GPS and no cache
      setLocation({
        name: "Barcelona",
        latitude: 41.385063,
        longitude: 2.173404,
      });
    })();
  }, []);

  return location;
}
