// app/(tabs)/favorites/index.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Card } from "../../../src/shared";
import { useFavorites } from "../../../src/shared/favorites/useFavorites";
// Import the new hook

export default function FavoritesIndex() {
  const router = useRouter();
  // Destructure the data and loading state from our abstraction
  const { favorites, removeFavorite, isLoading } = useFavorites();

  // Show a brief loading indicator while AsyncStorage fetches the data
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.map((city) => (
        <TouchableOpacity
          key={city}
          onPress={() => router.push(`/favorites/${city}`)}
          onLongPress={() => removeFavorite(city)} // Useful addition: long press to delete
        >
          <Card>
            <Text style={styles.cityText}>📌 {city}</Text>
          </Card>
        </TouchableOpacity>
      ))}

      {favorites.length === 0 && (
        <Text style={styles.emptyText}>No favorites saved yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8fafc", gap: 12 },
  centered: { justifyContent: "center", alignItems: "center" },
  cityText: { fontSize: 18, fontWeight: "500", color: "#1e293b" },
  emptyText: { textAlign: "center", marginTop: 20, color: "#64748b" },
});
