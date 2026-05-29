import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Typography, sendLocalNotification } from '#shared';

export default function NotificationsScreen() {
  const triggerWeatherAlert = async () => {
    await sendLocalNotification(
      '⚠️ Severe Weather Warning',
      'A massive storm front is approaching your current location. Seek shelter!',
    );
  };

  const triggerDailySummary = async () => {
    await sendLocalNotification(
      '☀️ Daily Skycast Update',
      'Today looks clear and sunny with a high of 24°C. Perfect day for outdoor activities.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Typography
          variant='title'
          style={styles.headerTitle}
        >
          Local Notifications
        </Typography>

        <Text style={styles.description}>
          Test system weather updates and severe alert conditions right on your
          device hardware wrapper.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={triggerWeatherAlert}
        >
          <Card>
            <Text style={[styles.cardTitle, { color: '#ef4444' }]}>
              Trigger Critical Emergency Alert
            </Text>
            <Text style={styles.cardSubtitle}>
              Sends an immediate high-priority warning banner
            </Text>
          </Card>
        </TouchableOpacity>

        <View style={{ height: 12 }} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={triggerDailySummary}
        >
          <Card>
            <Text style={styles.cardTitle}>Trigger Routine Morning Update</Text>
            <Text style={styles.cardSubtitle}>
              Sends a standard standard banner summary report
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16 },
  headerTitle: { marginBottom: 12, textAlign: 'center' },
  description: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  cardSubtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
});
