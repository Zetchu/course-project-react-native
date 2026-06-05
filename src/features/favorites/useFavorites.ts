// src/shared/favorites/useFavorites.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FAVORITES_KEY = "@skycast_favorite_cities";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        // Fallback default cities for a fresh install
        const defaultCities = ["Barcelona", "Paris", "Tokyo"];
        setFavorites(defaultCities);
        await AsyncStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(defaultCities),
        );
      }
    } catch (error) {
      console.error("Failed to load favorites from storage", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (city: string) => {
    try {
      // Prevent duplicates
      if (favorites.includes(city)) return;

      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save new favorite", error);
    }
  };

  const removeFavorite = async (city: string) => {
    try {
      const newFavorites = favorites.filter((c) => c !== city);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  return { favorites, addFavorite, removeFavorite, isLoading };
}
