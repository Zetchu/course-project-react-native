import { Stack } from 'expo-router';

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Details' }}
      />
    </Stack>
  );
}
