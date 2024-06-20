import {View, Image, Text} from "react-native";
import React from "react";

export default function Profile() {
    return (
        <View>
            <Image source={require('../assets/default-user-image-temp.jpg')} />
            <Text> username </Text>
            <Text> email </Text>

        </View>
    );
}