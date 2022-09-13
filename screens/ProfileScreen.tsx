import { Entypo, Feather } from '@expo/vector-icons';
import { useNhostClient, useSignOut, useUserId } from '@nhost/react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import MasonryList from '../components/MasonryList';
import { Text } from '../components/Themed';

const GET_USER_QUERY = `
query MyQuery($id:uuid!) {
  user(id: $id) {
    displayName
    avatarUrl
    id
    pins {
      id
      image
      title
      created_at
    }
  }
}
`

export default function ProfileScreen () {
  const userId = useUserId()
  const { signOut } = useSignOut()
  const nhost = useNhostClient()
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId })
    if (result.error) {
      console.log(result.error)
      Alert.alert("Error fetching the user")
    } else {
      setUser(result.data.user)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  if (!user) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <Pressable onPress={signOut}>
            <Feather name="share" size={24} color="black" style={styles.icon} />
          </Pressable>
          <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.icon} />
        </View>
        <Image style={styles.image} source={{ uri: user.avatarUrl }} />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Followings</Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    margin: 10
  },
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10
  },
  header: {
    alignItems: "center"
  },
  icons: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10
  },
  icon: {
    paddingHorizontal: 10
  },
});
