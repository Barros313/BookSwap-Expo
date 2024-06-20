import React, {useContext, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import {UserContext} from "./UserContext";

export default function Login({ route, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId } = useContext(UserContext);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_AUTH_CONNECTION}/api/auth/login`, {
                email, password
            });
            // alert(response.data.user.id);

            setUserId(response.data.user.id);
            route.params.onLoginSuccess();

        } catch (error) {
            alert(`Erro ao login ${error}`);
        }
    };

    return (
      <View style={styles.container}>
          <Image style={styles.logo} source={{ uri: 'https://i.ibb.co/02QLTG2/applogo-min.png' }} />

          <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
          <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} secureTextEntry value={password} />
          <Button title='Entrar' onPress={handleLogin} />

          <Button style={styles.button} title='Primeiro acesso? Cadastre-se' onPress={() => navigation.navigate('Register')} />

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
    logo : {
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