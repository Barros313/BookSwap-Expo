import {View, Image, Text, StyleSheet} from "react-native";
import React, {useContext, useEffect, useState} from "react";

import Login from './authentication/Login';

export default function Profile() {
    const { user } = useContext(Login);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://192.168.0.151:5000/api/auth/me?id=${userData.id}`);
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        if (userData) {
            fetchUserData();
        }

    }, [userData]);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text> Loading... </Text>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <Image source={require('../assets/default-user-image-temp.jpg')} />

            <Text style={styles.label}> id: {userData.id} </Text>
            <Text style={styles.label}> Username: {user.username} </Text>
            <Text style={styles.label}> Email: {user.email} </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    label: {
        fontSize: 18,
        marginBottom: 12
    }
});