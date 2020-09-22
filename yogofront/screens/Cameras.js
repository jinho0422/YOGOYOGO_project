import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, SafeAreaView, Modal, Image } from 'react-native';

import { Button, Text, Block } from '../components';
import { theme } from '../constants';

import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Explore_korea_presenter from "./Explore_korea_presenter"

export default function Cameras(props) {
    
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHaspermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHaspermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Block />;
    }
    if (hasPermission === false) {
        return <Text> nono </Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync({
                base64:true,
            });
            const uri = data.uri;
            setCapturedPhoto(data.uri);
            setOpen(true);
            //console.log(data.base64);
            //var forms=[{name:'image', filename: 'image.jpg', type:'image/jpg', data: uri}]
            var forms=new FormData();
            const meta={
                data:data.base64,
                name:'image',
                filename:'image.png',
                type:'image/png'
            }
            forms.append(meta)
            axios.post("http://k02a2031.p.ssafy.io:5000/predict", {
               headers:{ 'Content-Type': 'multipart/form-data'},
               forms
            }).then((res)=>{
                //console.log(res)
                setOpen(false);
                const navigation=props.navigation;
                console.log(navigation)
                //const navigation=this.props.navigation
                //navigation.navigate('Browse')
                return navigation.navigate("search_rendering",{data:res.data})
                const data=res.data;
                const loading=false;
                return <Explore_korea_presenter loading={loading} data={data} navigation={navigation}></Explore_korea_presenter>
                //return <Text>aaa</Text>
            }
            )
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera
                style={{ flex: 1 }}
                type={type}
                ref={camRef}
            >
                <Block style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} >
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff' }}>카메라 전환</Text>
                    </TouchableOpacity>
                </Block>
            </Camera>

            <TouchableOpacity style={styles.button} onPress={takePicture}>
                <FontAwesome name="camera" size={23} color="#fff" />
            </TouchableOpacity>

            {capturedPhoto &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                            <FontAwesome name="window-close" size={50} color="#FF0000" />
                        </TouchableOpacity>
                        <Image
                            style={{ width: '100%', height: 300, borderRadius: 20 }}
                            source={{ uri: capturedPhoto }}
                        />
                    </View>
                </Modal>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
        borderRadius: 10,
        height: 50,
    },
});