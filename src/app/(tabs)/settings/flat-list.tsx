import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Card, Typography } from "#shared";

const INITIAL_DATA = Array.from({ length: 15 }, (_, i) => ({
  id: `item-${i}`,
  title: `Item Number ${i + 1}`,
  description: `Detailed description for item ${i + 1}`,
}));

export default function FlatListExample() {
  const [data, setData] = useState(INITIAL_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setData(INITIAL_DATA);
      setRefreshing(false);
    }, 1500);
  }, []);

  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setData((prev) => {
        const start = prev.length;
        const newData = Array.from({ length: 10 }, (_, i) => ({
          id: `item-${start + i}`,
          title: `Item Number ${start + i + 1}`,
          description: `Detailed description for item ${start + i + 1}`,
        }));
        return [...prev, ...newData];
      });
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof INITIAL_DATA)[0] }) => (
      <Card>
        <Typography variant="label">{item.title}</Typography>
        <Typography variant="muted">{item.description}</Typography>
      </Card>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.header}>
        FlatList Example
      </Typography>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { padding: 16 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
});
