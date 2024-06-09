import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet, Button, SafeAreaView } from "react-native";

export default function Publish() {
    return (
        <View style={styles.container}>
            <Text> Content </Text>
            <Form/>
        </View>
    );
}

function Form() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { submittedData, setSubmittedData } = useState(null);

    const onSubmit = (data) => {
        console.log('Submitted data: ', data);
        setSubmittedData(data);
    };

    return (
        <SafeAreaView>
            <View style={styles.formContainer}>

                <Controller
                    control={control}
                    render={({ field }) => {
                        <TextInput
                            {...field}
                            style={styles.formInput}
                            placeholder="Your Name"
                        />
                    }}
                    name='name'
                    rules={{ required: 'You must enter your name' }}
                />
                {errors.name && <Text style={styles.errorText}> {errors.name.message} </Text>}

                <Controller
                    control={control}
                    render={({ field }) => {
                        <TextInput
                            {...field}
                            style={styles.formInput}
                            placeholder="Email"
                        />
                    }}
                    name='email'
                    rules={{
                        required: 'You must enter your name',
                        pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email address'}
                    }}
                />
                {errors.email && <Text style={styles.errorText}> {errors.email.message} </Text>}

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

const styles = StyleSheet.create({
    container: {
        fontSize: 20
    },
    formContainer: {
        padding: 16
    },
    formInput: {
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