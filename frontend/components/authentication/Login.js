import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function Login({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_AUTH_CONNECTION}/api/auth/login`, {
                email, password
            });
            alert(response.data.user.id);

            route.params.onLoginSuccess();

        } catch (error) {
            alert(`Erro ao login ${error}`);
        }
    };

    return (
      <View>
          <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
          <TextInput placeholder="Senha" onChangeText={setPassword} secureTextEntry value={password} />
          <Button title='Entrar' onPress={handleLogin} />

          <Button title='Primeiro acesso? Cadastre-se' onPress={() => navigation.navigate('Register')} />

      </View>
    );
}