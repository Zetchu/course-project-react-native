import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0284c7',
      }}
    >
      {/* 1. Main Weather Route */}
      <Tabs.Screen
        name='index'
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => <Text style={{ color }}>☀️</Text>,
        }}
      />
      {/* 2. Nested Stack Layout (Target folder name only) */}
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⭐</Text>,
        }}
      />
      {/* 3. Nested Drawer Layout (Target folder name only) */}
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
}
