import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const [backendStatus, setBackendStatus] = useState('checking...');

  useEffect(() => {
    console.log('Fetching from:', process.env.EXPO_PUBLIC_API_URL);

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/ping`)
      .then(res => res.json())
      .then(data => {
        console.log('Got data:', data);
        setBackendStatus(data.message);
      })
      .catch(err => {
        console.log('Fetch error:', err);
        setBackendStatus('failed: ' + err.message);
      });
  }, []);

  return (
    <View>
      <Text>Backend status: {backendStatus}</Text>
    </View>
  );
}