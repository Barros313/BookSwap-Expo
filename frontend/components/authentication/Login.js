import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

// import {useNavigation} from "@react-navigation/native";

export default function Login({ route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    // const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://192.168.1.26:5000/api/auth/login", {
                email, password
            });
            alert(response.data);

            route.params.onLoginSuccess();

        } catch (error) {
            alert('Erro ao login');
        }
    };

    return (
      <View>
          <TextInput placeholder={email} onChangeText={setEmail} value={email} />
          <TextInput placeholder={password} onChangeText={setPassword} secureTextEntry value={password} />
          <Button title='Login' onPress={handleLogin} />
      </View>
    );
}