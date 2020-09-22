import React, { Component
 } from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'
import axios from 'axios'
import { theme } from "../constants";

export default class CommunityWrite extends React.Component {
  state = {
    recipe: '', name: '', name2: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signup = async () => {
    const { password, email, nickname } = this.state
    console.log(this.state)
    const SERVER_IP = 'http://i02a107.p.ssafy.io:8000'
    axios.post(SERVER_IP + '/auth/signup/', this.state)
      .then(res => {
        console.log('회원가입성공'),
        Toast.show('회원가입이 완료되었습니다'),
        this.props.navigation.navigate('LoginScreen')
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={styles.profileImg}
          source={require('../assets/recipe.jpg')}
        /> */}
        <TextInput
          style={styles.input}
          placeholder='레시피명'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('recipe', val)}
        />
       <TextInput
          style={styles.input}
          placeholder='레시피명'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('recipe', val)}
        />
         <TextInput
          style={styles.input}
          placeholder='레시피명'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('recipe', val)}
        />
         <TextInput
          style={styles.input}
          placeholder='레시피명'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('recipe', val)}
        />
         <TextInput
          style={styles.input}
          placeholder='레시피명'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('recipe', val)}
        />
        <TouchableOpacity
          onPress={this.signup}
          style={styles.signupBtn}>
          <Text style={{ fontSize: 17, textAlign: 'center', color: 'white' }}>
            등록하기
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#666699',
    margin: 10,
    padding: 8,
    borderRadius: 9,
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.black,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupBtn: {
    justifyContent: 'flex-end',
    backgroundColor: '#8D8D8D',
    padding: 20,
    borderRadius: 30,
    width: 150,
    marginLeft: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    marginTop: 10,
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'white',
    marginBottom: 15,
  }
})