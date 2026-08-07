import { QueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

// Adjust base URL depending on environment/platform
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:4000', // Android Emulator bridge
  ios: 'http://localhost:4000',     // iOS Simulator
  default: 'http://localhost:4000', // Default fallback / physical device IP
});

// Configure TanStack Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      retry: 2,
    },
  },
});

// Helper fetch function
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/api/users`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}