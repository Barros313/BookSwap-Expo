import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, Image, Alert} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [ image, setImage ] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async(uri) => {
        let formData = new FormData();
        formData.append('image', {
            uri,
            type: 'image/jpeg',
            name: 'upload.jpg'
        });

        try {
            const response = await axios
                .post(`https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_IMGBB_API_KEY}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data.data.url;
        } catch(error) {
            Alert.alert("Error uploading image: " + error);
            console.error("Error uploading image: ",  error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (image) {
            const uploadedImageUrl = await uploadImage(image);
            if (uploadedImageUrl) {
                setImageUrl(uploadedImageUrl);
                submitForm(uploadedImageUrl);
            }
        } else {
            submitForm();
        }
    };

    const submitForm = async (photoUrl) => {
        try {
            const response = await axios.post('http://localhost:3000/books', {
                name: title,
                author: author,
                description: description,
                photo: photoUrl
            });
            Alert.alert("Success", "Book published successfully!");
            // Clear form
            setTitle("");
            setAuthor("");
            setDescription("");
            setImage(null);
            setImageUrl("");
        } catch (error) {
            console.error("Error submitting form:", error);
            Alert.alert("Error", "Failed to publish book");
        }
    };

    return (
        <View style={styles.container}>
            <View style={imageStyle.container}>
                {image && <Image source={{ uri: image }} style={imageStyle.image} />}
                <Button title="Select Image" onPress={pickImage} />
            </View>

            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter book title"
            />

            <Text style={styles.label}>Author:</Text>
            <TextInput
                style={styles.input}
                value={author}
                onChangeText={setAuthor}
                placeholder="Enter author name"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter a brief description"
            />

            <Button title="Publish" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10
    },
});

const imageStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200
    }
});

export default Publish;