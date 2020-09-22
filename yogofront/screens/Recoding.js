import React, { Component } from 'react';
import Expo from "expo";
import {
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 20,
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 8,
    marginTop: 20,
  },
  text: {
    color: '#fff',
  }
})

export default class SpeechToTextButton extends Component {
  constructor(props) {
    super(props)
    this.recording = null
    this.state = {
      isFetching: false,
      isRecording: false,
      transcript: '',
    }
  }

  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI())
      await FileSystem.deleteAsync(info.uri)
    } catch (error) {
      console.log('There was an error deleting recorded file', error)
    }
  }

  getTranscription = async () => {
    this.setState({ isFetching: true })
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI())
      const clientId = 'wr1zlt7xqc';
      const clientSecret = 'jh6QlMdowR4MvWgPHT3mxpWdixtJ6kG53wCiNKSq';
      //const url = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor"
      const url="http://k02a2031.p.ssafy.io:5000/audio"
      console.log(uri)
      const formData = new FormData()
      // Base64 encoding for reading & writing
      const options = { encoding: FileSystem.EncodingType.Base64 };
      // Read the audio resource from it's local Uri
      await FileSystem.readAsStringAsync(uri,options)
        .then((res) => {
        //  console.log('res',res)
          axios.post(url, {
            headers: {
              'Content-Type': 'application/octet-stream',
              'X-NCP-APIGW-API-KEY-ID': clientId,
              'X-NCP-APIGW-API-KEY': clientSecret
            },
            res
          }).then((response) => {
            console.log("성공")
            console.log(response.data)
            if(response.data["text"]==="")
                return
            axios.get("http://k02a2031.p.ssafy.io:5000/search", {
            params: {
                text: response.data["text"]
            }
        })
            .then((res) => {
                //console.log(res),
                this.setState({
                    loading: false,
                    ingredients: res.data
                })

                const navigation=this.props.navigation;
                console.log(navigation)
                return navigation.navigate("search_rendering",{data:res.data})
        


            })
            .catch((err) => {
                console.log(err);
            })

          }).catch((err)=>{
            console.log('실패')
            console.log(err)
          })
        })

      // formData.append('file', {
      //   data,
      //   type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
      //   name: Platform.OS === 'ios' ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
      // })
      // const res = await axios.post(url, data, {
      //   headers: {
      //     'Content-Type': 'application/octet-stream',
      //     'X-NCP-APIGW-API-KEY-ID': clientId,
      //     'X-NCP-APIGW-API-KEY': clientSecret
      //   }
      // });
      // console.log(res)
      // const opt = {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'application/octet-stream',
      //     'X-NCP-APIGW-API-KEY-ID': clientId,
      //     'X-NCP-APIGW-API-KEY': clientSecret
      //   }
      // };
      // const text = await fetch(url, opt);
      // const { text } = await axios.post(url, formData, {
      //   headers: {
      //     'Content-Type': 'application/octet-stream',
      //     'X-NCP-APIGW-API-KEY-ID': clientId,
      //     'X-NCP-APIGW-API-KEY': clientSecret
      //   },
      // })

      // console.log(JSON.stringify(text))
      // this.setState({ transcript: text })
    } catch (error) {
      console.log('There was an error reading file', error)
      this.stopRecording()
      this.resetRecording()
    }
    this.setState({ isFetching: false })
  }

  startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted') return

    this.setState({ isRecording: true })
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    })
    const recording = new Audio.Recording()

    try {
      await recording.prepareToRecordAsync(recordingOptions)
      await recording.startAsync()
    } catch (error) {
      console.log(error)
      this.stopRecording()
    }

    this.recording = recording
  }

  stopRecording = async () => {
    this.setState({ isRecording: false })
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      // noop
    }
  }

  resetRecording = () => {
    this.deleteRecordingFile()
    this.recording = null
  }

  handleOnPressOut = () => {
    this.stopRecording()
    this.getTranscription()
  }

  render() {
    const {
      isRecording, transcript, isFetching,
    } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={this.startRecording}
          onPressOut={this.handleOnPressOut}
        >
          {isFetching && <ActivityIndicator color="#ffffff" />}
          {!isFetching &&
            <Text style={styles.text}>
              {isRecording ? 'Recording...' : 'Start recording'}
            </Text>
          }
        </TouchableOpacity>
        <Text>
          {`${transcript}`}
        </Text>
      </View>
    )
  }
}
