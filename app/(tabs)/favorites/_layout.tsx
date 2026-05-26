import { Stack } from 'expo-router';

export default function FavoritesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#0284c7' },
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Saved Locations' }}
      />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Location Deep-dive' }}
      />
    </Stack>
  );
}
