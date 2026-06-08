import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "#shared";

export default function SettingsIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Data Display Demos</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/settings/flat-list")}
      >
        <Card>
          <Text style={styles.cardTitle}>📋 FlatList Demo</Text>
          <Text style={styles.cardSubtitle}>
            Pull-to-refresh and infinite scrolling
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/settings/section-list")}
      >
        <Card>
          <Text style={styles.cardTitle}>📚 SectionList Demo</Text>
          <Text style={styles.cardSubtitle}>
            Grouped data with sticky headers
          </Text>
        </Card>
      </TouchableOpacity>

      <Text style={[styles.headerText, { marginTop: 8 }]}>
        Preferences & Metric Configurations
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/settings/motion")}
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
        onPress={() => router.push("/settings/notifications")}
      >
        <Card>
          <Text style={styles.cardTitle}>🔔 Notification Center</Text>
          <Text style={styles.cardSubtitle}>
            Configure system weather alerts and simulated updates
          </Text>
        </Card>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/settings/profile")}
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
    backgroundColor: "#f8fafc",
    gap: 12,
  },
  headerText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
});
