import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { Card } from '#shared';
import { useFavorites } from '#features/favorites';

function SwipeableCityItem({
  city,
  onPress,
  onDelete,
}: {
  city: string;
  onPress: () => void;
  onDelete: () => void;
}) {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    // Scales the "Delete" text up as you pull further left
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          void Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success,
          );
          onDelete();
        }}
      >
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
      onSwipeableOpen={(direction) => {
        if (direction === 'right') {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Card>
          <Text style={styles.cityText}>📌 {city}</Text>
        </Card>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default function FavoritesIndex() {
  const router = useRouter();
  const { favorites, removeFavorite, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator
          size='large'
          color='#0f172a'
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.map((city) => (
        <SwipeableCityItem
          key={city}
          city={city}
          onPress={() => router.push(`/favorites/${city}`)}
          onDelete={() => removeFavorite(city)}
        />
      ))}

      {favorites.length === 0 && (
        <Text style={styles.emptyText}>No favorites saved yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc', gap: 12 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  cityText: { fontSize: 18, fontWeight: '500', color: '#1e293b' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#64748b' },

  deleteButton: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 16,
    marginVertical: 4,
    marginLeft: 12,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
