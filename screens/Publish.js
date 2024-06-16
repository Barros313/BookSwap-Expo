import React, {useState} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import * as ImagePicker from 'expo-image-picker';


export default function Publish() {
    return (
        <>
            <ImageContainer />
        </>
    );
}

function ImageContainer() {
    const [ image, setImage ] = useState(null);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        };
    };

    return (
        <View style={imageStyle.container}>
            { image && <Image source={{ uri: image }} style={imageStyle.image} /> }

            <Pressable onPress={pickImage}>
                <Ionicons name="images-sharp" size={20} />
                <Text> Selecionar foto </Text>
            </Pressable>

        </View>
    );
}

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