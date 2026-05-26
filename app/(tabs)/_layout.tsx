import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0284c7' }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => <Text style={{ color }}>☀️</Text>,
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Text style={{ color }}>⭐</Text>,
        }}
      />
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
