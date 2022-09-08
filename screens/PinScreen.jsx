import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import pins from '../assets/data/pins'

const PinScreen = () => {
    const { params } = useRoute()

    const [ratio, setRatio] = useState(1);
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const pin = pins.find(p => p.id === params.id)

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        if (pin?.image) {
            Image.getSize(pin.image, (width, height) => setRatio(width / height))
        }
    }, [pin])

    if (!pin) {
        return <Text>Pin not found.</Text>
    }

    return (
        <SafeAreaView style={{ backgroundColor: "black" }}>
            <StatusBar style='light' />
            <View style={styles.root}>
                <Image source={{ uri: pin.image }} style={[styles.image, { aspectRatio: ratio }]} />
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