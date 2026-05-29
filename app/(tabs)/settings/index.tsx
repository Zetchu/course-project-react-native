import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '#shared';

export default function SettingsIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Preferences & Metric Configurations</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/settings/motion')}
      >
        <Card>
          <Text style={styles.cardTitle}>📱 Device Sensors</Text>
          <Text style={styles.cardSubtitle}>
            View real-time accelerometer and gyroscope data
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/settings/profile')}
      >
        <Card>
          <Text style={styles.cardTitle}>👤 Profile</Text>
          <Text style={styles.cardSubtitle}>Manage your account settings</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
    gap: 12,
  },
  headerText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});
