import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RemoteImage from "./RemoteImage";

function Pin (props: any) {
    const { image, title, id } = props.pin;
    const navigation = useNavigation()

    const onLike = () => { }

    const goToPinPage = () => {
        navigation.navigate("Pin", { id })
    }

    return <Pressable onPress={goToPinPage} style={styles.pin}>
        <View>
            <RemoteImage fileId={image} />
            <Pressable onPress={onLike} style={styles.heartBtn}>
                <AntDesign name="hearto" size={16} color="black" />
            </Pressable>
        </View>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
    </Pressable>;
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