import { useNhostClient } from '@nhost/react';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MasonryList from '../components/MasonryList';

export default function HomeScreen () {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const nhost = useNhostClient()

  const fetchPins = async () => {
    setLoading(true)
    const response = await nhost.graphql.request(`
    query MyQuery {
  pins {
    created_at
    title
    image
    id
          user_id
  }
}
    `);
    setLoading(false)
    if (response.error) {
      Alert.alert("Error fetching pins")
    } else {
      setPins(response.data.pins)
    }
  }

  useEffect(() => {
    fetchPins()
  }, [])

  return (
    <MasonryList pins={pins} onRefresh={fetchPins} refreshing={loading} />
  );
}
