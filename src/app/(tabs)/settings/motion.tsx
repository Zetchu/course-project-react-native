import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Typography, useDeviceMotion } from "#shared";

export default function MotionScreen() {
  const motion = useDeviceMotion();

  // Helper function to format the long decimal numbers
  const formatNumber = (num?: number) => {
    if (num === undefined) return "0.00";
    return num.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Typography variant="title" style={styles.headerTitle}>
          Device Sensors
        </Typography>

        <Card>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Pitch (Up/Down):</Text>
            <Text style={styles.value}>
              {formatNumber(motion?.rotation?.beta)}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Roll (Side/Side):</Text>
            <Text style={styles.value}>
              {formatNumber(motion?.rotation?.gamma)}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Yaw (Twist):</Text>
            <Text style={styles.value}>
              {formatNumber(motion?.rotation?.alpha)}
            </Text>
          </View>
        </Card>

        <Text style={styles.hint}>
          Move your device around to see the raw gyroscope data update in
          real-time!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  content: { padding: 16 },
  headerTitle: { marginBottom: 24, textAlign: "center" },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  label: { fontSize: 16, color: "#64748b", fontWeight: "500" },
  value: {
    fontSize: 18,
    color: "#0f172a",
    fontWeight: "bold",
    fontFamily: "Courier",
  },
  hint: {
    marginTop: 24,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 14,
    paddingHorizontal: 20,
  },
});
