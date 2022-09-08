import { ScrollView, StyleSheet, View } from "react-native";
import Pin from "./Pin";

interface IMasonryList {
    pins: {
        id: string,
        image: string,
        title: string,
    }[]
}

export default function MasonryList ({ pins }: IMasonryList) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.column}>
                    {pins.filter((_, index) => index % 2 === 0).map((pin) => (
                        <Pin pin={pin} key={pin.id} />
                    ))}
                </View>
                <View style={styles.column}>
                    {pins.filter((_, index) => index % 2 === 1).map((pin) => (
                        <Pin pin={pin} key={pin.id} />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
    },
    column: { flex: 1 }
});
