import { useNhostClient } from '@nhost/react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';

const RemoteImage = ({ fileId }) => {
    const [ratio, setRatio] = useState(1);
    const [imageUri, setImageUri] = useState("");
    const nhost = useNhostClient()
    const fetchImage = async () => {
        const result = await nhost.storage.getPresignedUrl({ fileId })
        if (result.presignedUrl?.url) {
            setImageUri(result.presignedUrl?.url)
        }
    }

    useEffect(() => {
        fetchImage()
    }, [fileId])


    useEffect(() => {
        if (imageUri) {
            Image.getSize(imageUri, (width, height) => setRatio(width / height))
        }
    }, [imageUri])

    if (!imageUri) {
        return <ActivityIndicator />
    }
    return (
        <Image style={[styles.image, { aspectRatio: ratio }]} source={{ uri: imageUri }} />
    )
}

export default RemoteImage

const styles = StyleSheet.create({
    image: {
        width: "100%",
        borderRadius: 15,
    },
})