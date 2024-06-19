import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email, password
            });
            alert(`Welcome ${response.data.message}`);
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