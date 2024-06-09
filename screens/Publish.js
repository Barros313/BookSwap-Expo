import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Publish() {
    return (
        <View>
            <PublishBody/>
        </View>
    );
}

function PublishBody() {
    return (
        <View style={styles.container}>
            <Text> Content </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20
    }
});