import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function SettingsDrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: '#0284c7',
          headerStyle: { backgroundColor: '#0284c7' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen
          name='index'
          options={{ drawerLabel: 'General Settings', title: 'Settings' }}
        />
        <Drawer.Screen
          name='profile'
          options={{ drawerLabel: 'User Profile', title: 'Profile' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
