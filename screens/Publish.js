import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, Pressable, TouchableOpacity, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from 'expo-image-picker';

import { CameraView, useCameraPermissions } from "expo-camera";


export default function Publish() {
    return (
        <>
            <ImageContainer/>
            <Form></Form>
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

    const [ facing, setFacing ] = useState('back');
    const [ permission, requestPermission ] = useCameraPermissions();

    if (!permission) {
        return <View />;
    };

    if (!permission.granted) {
        return (
            <View style={cameraStyle.container}>
                <Text style={{ textAlign: 'center' }}> We need your permission to show the camera </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={imageStyle.container}>
            { image && <Image source={{ uri: image }} style={imageStyle.image} /> }

            <Pressable onPress={pickImage}>
                <Ionicons name="images-sharp" size={20} />
                <Text> Selecionar foto </Text>
            </Pressable>

            <CameraView style={cameraStyle.camera} facing={facing}>
                <View style={cameraStyle.buttonContainer}>
                <TouchableOpacity style={cameraStyle.button} onPress={toggleCameraFacing}>
                    <Text style={cameraStyle.text}>Flip Camera</Text>
                </TouchableOpacity>
                </View>
            </CameraView>

            {/* <Pressable>
                <Ionicons  name='camera-sharp' size={20} />
                <Text> Tirar foto </Text>
            </Pressable> */}

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

const cameraStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    }
});

function Form() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { submittedData, setSubmittedData } = useState(null);

    const onSubmit = (data) => {
        console.log('Submitted data: ', data);
        setSubmittedData(data);
    };

    return (
        <SafeAreaView>
            <View style={formStyle.container}>

                <Controller
                    control={control}
                    render={({ field }) => {
                        <TextInput
                            {...field}
                            style={formStyle.input}
                            placeholder="Your Name"
                        />
                    }}
                    name='name'
                    rules={{ required: 'You must enter your name' }}
                />
                {errors.name && <Text style={formStyle.errorText}> {errors.name.message} </Text>}

                <Controller
                    control={control}
                    render={({ field }) => {
                        <TextInput
                            {...field}
                            style={formStyle.input}
                            placeholder="Email"
                        />
                    }}
                    name='email'
                    rules={{
                        required: 'You must enter your name',
                        pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email address'}
                    }}
                />
                {errors.email && <Text style={formStyle.errorText}> {errors.email.message} </Text>}

                <Button title='submit' onPress={handleSubmit(onSubmit)} />

                {submittedData && (
                    <View>
                        <Text> Submitted Data: </Text>
                        <Text> Name: {submittedData.name} </Text>
                        <Text> Email: {submittedData.email} </Text>
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
};

const formStyle = StyleSheet.create({
    container: {
        padding: 16
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    }
});

const main = StyleSheet.create({
    container: {
    }
});