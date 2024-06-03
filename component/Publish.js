import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Publish() {
    return (
        <View>
            <PublishHeader/>
        </View>
    );
}

function PublishHeader() {
    return (
        <View style={styles.header}>
            <Text> Anunciar </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'blue',
    }
});