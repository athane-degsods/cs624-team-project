import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { queryClient, fetchUsers } from './src/api/client';
import { useAuthStore } from './src/store/useAuthStore';

interface User {
  id: string;
  name: string;
  email: string;
}

function UserListScreen() {
  // Zustand State
  const { user: activeUser, setUser, logout } = useAuthStore();

  // TanStack Query
  const { data: users, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>🧗‍♂️ Bouldering Community</Text>

      {/* Zustand Active Session Display */}
      <View style={styles.authBox}>
        {activeUser ? (
          <View>
            <Text style={styles.welcomeText}>Logged in as: <Text style={styles.bold}>{activeUser.name}</Text></Text>
            <Button title="Logout" color="#d9534f" onPress={logout} />
          </View>
        ) : (
          <Text style={styles.welcomeText}>Status: <Text style={styles.bold}>Guest User</Text></Text>
        )}
      </View>

      {/* Data List */}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text style={styles.errorText}>Error loading users: {(error as Error).message}</Text>}

      {users && users.length === 0 && (
        <Text style={styles.emptyText}>No climbers found in PostgreSQL.</Text>
      )}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            {/* Action to set user in Zustand */}
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setUser(item)}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserListScreen />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  authBox: {
    padding: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 12,
    color: '#6c757d',
  },
  selectButton: {
    backgroundColor: '#0275d8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
  },
});