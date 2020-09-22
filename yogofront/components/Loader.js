import React, { Component } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";


import { theme } from '../constants';


export default class Loader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={theme.colors.black} />
            </View>

        ) 
    }
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        flex: 1,
        justifyContent: 'center',
    }
});