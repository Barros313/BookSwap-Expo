import {View, Image, Text, StyleSheet} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import {UserContext} from "./authentication/UserContext";

export default function Profile() {
    const { userId } = useContext(UserContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_AUTH_CONNECTION}/api/auth/me?id=${userId}`);
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        if (userId) {
            fetchUserData();
        }

    }, [userId]);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text> ${userId} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <Image style={styles.profilePicture} source={{ uri: 'https://i.ibb.co/sK8cBMS/default-user-image-temp.jpg' }} />

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{user.username}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    loadingText: {
        fontSize: 20,
        color: '#333',
    },
    profilePicture: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '80%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 10,
    },
    value: {
        fontSize: 18,
        color: '#777',
    }
});