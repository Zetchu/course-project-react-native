import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='cloud'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='star'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='settings'
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
