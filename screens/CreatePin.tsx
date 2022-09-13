import { useNhostClient } from '@nhost/react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Button, Image, Platform, StyleSheet, TextInput, View } from 'react-native';

const CREATE_PIN_MUTATION = `
mutation MyMutation($image: String!, $title: String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      id
    }
  }
}

`

export default function CreatePinScreen () {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const navigation = useNavigation();
    const nhost = useNhostClient();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadFile = async () => {
        if (!image) {
            return {
                error: { message: "No image selected" }
            }
        }
        const parts = image.split('/')
        const name = parts[parts.length - 1]
        const nameParts = name.split(".")
        const extension = nameParts[nameParts.length - 1]
        const uri = Platform.OS == "ios" ? image.replace("file:///", "") : image
        const result = await nhost.storage.upload({
            file: {
                name,
                type: `image/${extension}`,
                uri,
            },
        })
        return result;
    }

    const onSubmit = async () => {
        const uploadResult = await uploadFile()
        if (uploadResult?.error) {
            Alert.alert("Error uploading the image", uploadResult.error.message)
            return;
        }
        const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
            title,
            image: uploadResult.fileMetadata.id
        })
        if (result.error) {
            Alert.alert("Error creating the post", result.error.message)
        } else {
            navigation.goBack()
        }
    }

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