import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '#shared';

export default function FavoritesIndex() {
  const router = useRouter();
  const cities = ['Madrid', 'Paris', 'Tokyo'];

  return (
    <View style={styles.container}>
      {cities.map((city) => (
        <TouchableOpacity
          key={city}
          onPress={() => router.push(`/favorites/${city}`)}
        >
          <Card>
            <Text style={styles.cityText}>📌 {city}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc', gap: 12 },
  cityText: { fontSize: 18, fontWeight: '500', color: '#1e293b' },
});
