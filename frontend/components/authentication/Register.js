import React, { useState } from 'react';
import { View, TextInput, Button } from "react-native";
import axios from 'axios'

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                username, email, password
            });
            alert(response.data.message);
            navigation.navigate('Login');
        } catch (error) {
            alert('Erro ao registrar usuário');
        }
    };

    return (
        <View>
            <TextInput placeholder="Username" onChangeText={setUsername} value={username} />
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry value={password} />
            <Button title='Register' onPress={handleRegister} />
        </View>
    );
}