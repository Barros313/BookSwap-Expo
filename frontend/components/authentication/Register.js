import React, { useState } from 'react';
import { View, TextInput, Button } from "react-native";
import axios from 'axios'

export default function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://192.168.1.26:5000/api/auth/register", {
                username, email, password
            });
            alert(response.data.message);
            navigation.navigate("Login");
        } catch (error) {
            alert(`Erro ao registrar usuário: ${error}`);
        }
    };

    return (
        <View>
            <TextInput placeholder="Nome de Usuário" onChangeText={setUsername} value={username} />
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Senha" onChangeText={setPassword} value={password} secureTextEntry />
            <Button title="Cadastrar" onPress={handleRegister} />
        </View>
    );
}