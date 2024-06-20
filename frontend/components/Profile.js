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
                const response = await axios.get(`http://192.168.0.151:5000/api/auth/me?id=${userId}`);
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
            <Image style={styles.profilePicture} source={require('../assets/default-user-image-temp.jpg')} />

            {/*<Text style={styles.label}> id: {userData.id} </Text>*/}
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
    },
    profilePicture: {
        borderRadius: 5,
        width: 100,
        height: 100,
    }
});