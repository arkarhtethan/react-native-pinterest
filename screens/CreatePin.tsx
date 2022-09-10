import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';

export default function CreatePinScreen () {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const onSubmit = () => { }

    return (
        <View style={styles.root}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image &&
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                        placeholder='Title...'
                        style={styles.input}
                    />
                    <Button title="Submit Pin" onPress={onSubmit} />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,
    },
    image: { width: "100%", aspectRatio: 1, marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        width: "100%",
        marginVertical: 10,
        borderRadius: 5,
    }
})