import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Image} from "react-native";
import axios from 'axios'

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_AUTH_CONNECTION}/api/auth/register`, {
                username, email, password
            });
            alert(response.data.message);
            navigation.navigate("Login");
        } catch (error) {
            alert(`Erro ao registrar usuário: ${error}`);
        }
    };

    return (
        <View style={styles.container} >
            <Image style={styles.logo} source={{ uri: 'https://i.ibb.co/02QLTG2/applogo-min.png' }} />

            <TextInput style={styles.input} placeholder="Nome de Usuário" onChangeText={setUsername} value={username} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} value={password} secureTextEntry />
            <Button title="Cadastrar" onPress={handleRegister} />

            <Button style={styles.button} title="Já possui uma conta? Faça login" onPress={() => navigation.navigate("Login")} />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        margin: 20,
        paddingHorizontal: 10,
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#000',
    },
    button: {
        margin: 20,
    }
});