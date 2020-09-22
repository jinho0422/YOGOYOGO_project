import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import axios from 'axios';


export default class Singup extends Component {

    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false,
        uid: null
    }

    handleSignup() {
        const { navigation } = this.props;
        const { email, username, password } = this.state;
        const errors = [];

        var forms = new FormData();
        forms = { 'email': email, 'pwd': password, 'nick': username }

        Keyboard.dismiss();
        this.setState({ errors: [], loading: true });

        if (!email) errors.push('email');
        if (!username) errors.push('username');
        if (!password) errors.push('password');



        this.setState({ errors, loading: false });

        if (!errors.length) {
            // console.log(errors.length)
            // console.log(forms.type)
            // console.log(forms)
            axios.post("http://k02a2031.p.ssafy.io:5000/user", forms)
                .then(Response => {
                    this.setState({ uid: Response.data["uid"] });
                    Alert.alert(
                        '환영합니다!',
                        '선호하는 요리를 골라주세요.',
                        [
                            {
                                text: 'Continue', onPress: () => {
                                    return navigation.navigate('SurveyContainer', { uid: this.state.uid });
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                }).catch(error => {
                    console.log('failed', error)
                    Alert.alert(
                        '중복된 계정!',
                        '다른 이메일과 닉네임으로 다시시도해 주세요.',
                        [
                            {
                                text: 'Continue'
                                // , onPress: () => {
                                //     // console.log(this.state.uid)
                                //     navigation.navigate('SurveyContainer', { uid: this.state.uid })
                                // }
                            }
                        ],
                        { cancelable: false }
                    )
                })

        }
    }


    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.signup} behavior="height">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Signup</Text>
                    <Block middle>
                        <Input
                            email
                            label="이메일"
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            label="닉네임"
                            error={hasErrors('username')}
                            style={[styles.input, hasErrors('username')]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        <Input
                            secure
                            label="비밀번호"
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />


                        {/* <Button gradient onPress={() => this.handleSignup()}> */}
                        <Button gradient onPress={() => this.handleSignup()}>
                            {loading ? <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Signup</Text>
                            }
                        </Button>
                        <Text center onPress={() => navigation.goBack()}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>Back to Login</Text>
                        </Text>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    signup: {
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