import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function FavoriteDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Detailed breakdown for location: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  text: { fontSize: 16, color: "#334155", fontWeight: "500" },
});
