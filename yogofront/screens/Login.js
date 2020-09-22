import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';


const VALID_EMAIL = "yogoyogo@naver.com";
const VALID_PASSWORD = "jinho";

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    }

    handleLogin() {

        const { navigation } = this.props;
        const { email, password } = this.state;
        const errors = [];
        let forms = new FormData();
        forms = { 'email': email, 'pwd': password }


        Keyboard.dismiss();
        this.setState({ errors: [], loading: true });


        if (!email) errors.push('email');
        if (!password) errors.push('password');

        if (!errors.length) {
            console.log(forms)
            axios.post("http://k02a2031.p.ssafy.io:5000/user/login",
                forms
            )
                .then(Response => {
                    console.log(Response.data)
                    navigation.navigate("Sevenfood");
                    // Alert.alert(
                    //     'Success!',
                    //     'Your account has been created.',
                    //     [
                    //         {
                    //             text: 'Continue', onPress: () => {
                    //                 console.log('continue')
                    //                 navigation.navigate('Sevenfood')
                    //             }
                    //         }
                    //     ],
                    //     { cancelable: false }
                    // )
                })
                .catch(error => {
                    console.log('failed', error)
                })


        }
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            email
                            label="Email"
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            secure
                            label="Password"
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ? <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>
                        <Text center onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>Forgot your password?</Text>
                        </Text>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
    }
})