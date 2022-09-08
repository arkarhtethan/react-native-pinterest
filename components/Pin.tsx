import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Pin (props: any) {
    const { image, title } = props.pin;
    const [ratio, setRatio] = useState(1);
    const onLike = () => { }
    useEffect(() => {
        if (image) {
            Image.getSize(image, (width, height) => setRatio(width / height))
        }
    }, [image])


    return <View style={styles.pin}>
        <View>
            <Image style={[styles.image, { aspectRatio: ratio }]} source={{ uri: image }} />
            <Pressable onPress={onLike} style={styles.heartBtn}>
                <AntDesign name="hearto" size={16} color="black" />
            </Pressable>
        </View>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
    </View>;
}


const styles = StyleSheet.create({
    heartBtn: {
        backgroundColor: "#D3CFD4",
        position: "absolute",
        bottom: 10,
        right: 10,
        padding: 5,
        borderRadius: 50
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        margin: 5,
        color: "#181818"
    },
    image: {
        width: "100%",
        borderRadius: 15,
    },
    pin: {
        width: "100%",
        padding: 4,
    }
});

export default Pin;