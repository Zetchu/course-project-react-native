import React, { useCallback } from "react";
import { View, SectionList, StyleSheet } from "react-native";
import { Card, Typography } from "#shared";

const SECTIONS = [
  {
    title: "Group A",
    data: [
      { id: "a1", label: "Item A1", desc: "Description for A1" },
      { id: "a2", label: "Item A2", desc: "Description for A2" },
      { id: "a3", label: "Item A3", desc: "Description for A3" },
    ],
  },
  {
    title: "Group B",
    data: [
      { id: "b1", label: "Item B1", desc: "Description for B1" },
      { id: "b2", label: "Item B2", desc: "Description for B2" },
    ],
  },
  {
    title: "Group C",
    data: [
      { id: "c1", label: "Item C1", desc: "Description for C1" },
      { id: "c2", label: "Item C2", desc: "Description for C2" },
      { id: "c3", label: "Item C3", desc: "Description for C3" },
      { id: "c4", label: "Item C4", desc: "Description for C4" },
    ],
  },
  {
    title: "Group D",
    data: [
      { id: "d1", label: "Item D1", desc: "Description for D1" },
      { id: "d2", label: "Item D2", desc: "Description for D2" },
    ],
  },
];

export default function SectionListExample() {
  const renderItem = useCallback(
    ({ item }: any) => (
      <View style={styles.cardWrapper}>
        <Card>
          <Typography variant="label">{item.label}</Typography>
          <Typography variant="muted">{item.desc}</Typography>
        </Card>
      </View>
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: any) => (
      <View style={styles.sectionHeader}>
        <Typography variant="title">{section.title}</Typography>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Typography variant="muted" style={styles.pageDescription}>
        This is a SectionList demonstrating sticky headers and grouped data
        mapping.
      </Typography>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  pageDescription: { padding: 16, paddingBottom: 8 },
  sectionHeader: {
    backgroundColor: "#e2e8f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  listContent: { paddingBottom: 24 },
});
