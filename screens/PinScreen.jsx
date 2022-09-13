import { Ionicons } from '@expo/vector-icons'
import { useNhostClient } from '@nhost/react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import RemoteImage from '../components/RemoteImage'

const PinScreen = () => {
    const { params } = useRoute()
    const nhost = useNhostClient()
    const [pin, setPin] = useState(null);

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const pinId = params?.id;

    const goBack = () => {
        navigation.goBack()
    }
    const fetchPin = async (pinID) => {
        const response = await nhost.graphql.request(
            GET_PIN_QUERY, { id: pinID }
        );
        if (response.error) {
            Alert.alert("Error fetching the pin")
        } else {
            setPin(response.data.pins_by_pk)
        }
    }

    useEffect(() => {
        fetchPin(pinId)
    }, [])

    if (!pin) {
        return <Text>Pin not found.</Text>
    }

    return (
        <SafeAreaView style={{ backgroundColor: "black" }}>
            <StatusBar style='light' />
            <View style={styles.root}>
                <RemoteImage fileId={pin.image} />
                <Text style={styles.title}>{pin.title}</Text>
            </View>
            <Pressable onPress={goBack} style={[styles.backBtn, { top: insets.top + 20 }]} >
                <Ionicons name="chevron-back" size={35} color="white" />
            </Pressable>
        </SafeAreaView >
    )
}

export default PinScreen

const styles = StyleSheet.create({
    root: {
        height: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    image: {
        width: "100%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    title: {
        margin: 10,
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 35
    },
    backBtn: {
        position: "absolute",
        left: 10
    }
})

const GET_PIN_QUERY = `
                query MyQuery($id:uuid!) {
                    pins_by_pk(id: $id) {
                        id
                        created_at
                        image
                        title
                        user_id
                        user {
                        avatarUrl
                        id
                        displayName
                        }
                    }
                }
            `
