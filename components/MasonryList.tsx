import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Pin from "./Pin";

interface IMasonryList {
    pins: {
        id: string,
        image: string,
        title: string,
    }[],
}

export default function MasonryList ({ pins }: IMasonryList) {
    const width = useWindowDimensions().width;
    const numColumns = Math.ceil(width / 350);
    return (
        <ScrollView>
            <View style={styles.container}>
                {Array.from(Array(numColumns)).map((col, colIndex) => (
                    <View style={styles.column} key={colIndex}>
                        {pins.filter((_, index) => index % numColumns === colIndex).map((pin) => (
                            <Pin pin={pin} key={pin.id} />
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
// x5GXhQNdcCuCmWmQ
const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        flexDirection: "row",
    },
    column: { flex: 1 }
});
