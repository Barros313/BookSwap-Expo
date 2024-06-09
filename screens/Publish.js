import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet, Button, SafeAreaView, Image } from "react-native";

import * as ImagePicker from 'expo-image-picker';

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

    return (
        <View style={imageStyle.container}>
            { image && <Image source={{ uri: image }} style={imageStyle.image} /> }
            <Button title='Select image from camera roll' onPress={pickImage} />
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