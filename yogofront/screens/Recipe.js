import React from "react";
import { Alert, StyleSheet,  View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import Moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from 'axios';
import fs from 'expo-file-system';

import { Block, Text} from "../components";

export default class Recipe extends React.Component {
    state = {
        trackLength: 300,
        timeElapsed: "0:00",
        timeRemaining: "5:00",
        recipes: "오른쪽버튼을 눌러주세요!",
        steps : 1,
    };

    changeTime = seconds => {
        this.setState({ timeElapsed: Moment.utc(seconds * 1000).format("m:ss") });
        this.setState({ timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format("m:ss") });
    };

    // async componentDidMount() {
    //     const recipe_rid = this.props.navigation.state.params;
    //     const rid = recipe_rid["recipe_id"];
    //    console.log(rid);
    //    //console.log(this.state.steps);
    //     axios.get("http://k02a2031.p.ssafy.io:5000/steps/" + rid +"/"+this.state.steps)
    //     .then((res) => {
    //         this.setState({
    //             recipes: res.data[0]["description"]
    //         })
    //     }).catch((err) => {
    //         console.log(err);
    //     })  
    // }


    handleclick =(tmp) => {
        const{steps} = this.state;
        const recipe_rid = this.props.navigation.state.params;
        const rid = recipe_rid["recipe_id"];

        if(tmp === 0){
            if (steps == recipe_rid["steps"] + 1) {
                this.setState({
                    steps: steps -1
                })
                Alert.alert(
                    '축하드립니다 완성입니다',
                )
            }

            else {
            axios.get("http://k02a2031.p.ssafy.io:5000/steps/" + rid + "/" + steps)
            .then((res) =>this.setState({
                recipes: res.data[0]["description"],
                steps: steps + 1
            }), console.log(steps))
            }
        }
        else if(tmp === 1){
            if(steps == 0) {
                this.setState({
                    steps:steps + 1
                })
                Alert.alert(
                    '처음단계입니다',
                )
            }
            else {
            axios.get("http://k02a2031.p.ssafy.io:5000/steps/" + rid + "/" + steps)
                .then((res) => this.setState({
                    recipes: res.data[0]["description"],
                    steps: steps - 1
                }),console.log(steps))
            }
        }
        else if(tmp === 2) {
            this.setState({
                steps: 1
            })
        }
    }

    render() {
        const items = this.props.navigation.state.params;
        const {steps} = this.state;
        console.log("check");
        console.log(this.state.recipes);
       
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        {/* <Text style={[styles.textLight, { fontSize: 12 }]}>일식</Text> */}
                        <Text h3 bold style={[styles.textDark, { fontSize: 30, fontWeight: "500" }]}>{items["recipe_name"]}</Text>
                    </View>

                    <View style={styles.coverContainer}>
                        <Image source={{"uri" : items["image_url"]} } style={styles.cover}></Image>
                    </View>

                    <View style={{ alignItems: "center"}}>
                       
                        
                        <Text style={[styles.text, { fontSize: 20, marginTop: 50 }]}>{this.state.recipes}</Text>
                    </View>
                </View>
                {/* 
                <View style={{ margin: 32 }}>
                    <Slider
                        minimumValue={0}
                        maximumValue={this.state.trackLength}
                        trackStyle={styles.track}
                        thumbStyle={styles.thumb}
                        minimumTrackTintColor="#93A8B3"
                        onValueChange={seconds => this.changeTime(seconds)}
                    ></Slider>
                    <View style={{ marginTop: -12, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={[styles.textLight, styles.timeStamp]}>{this.state.timeElapsed}</Text>
                        <Text style={[styles.textLight, styles.timeStamp]}>{this.state.timeRemaining}</Text>
                    </View>
                </View> */}

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 16, marginTop: 60 }}>
                    <TouchableOpacity 
                        onPress={() => { this.handleclick(1)}}
                    >
                        <FontAwesome5 name="backward" size={32} color="#93A8B3"></FontAwesome5>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playButtonContainer} onPress={() => { this.handleclick(2) }}>
                        <FontAwesome5
                            name="play"
                            size={32}
                            color="#3D425C"
                            style={[styles.playButton, { marginLeft: 8 }]}
                        ></FontAwesome5>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.handleclick(0)}
                        
                        }
                    >
                        <FontAwesome5 name="forward" size={32} color="#93A8B3" > </FontAwesome5>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
    textLight: {
        color: "#B6B7BF"
    },
    text: {
        color: "#8E97A6",
         marginTop: 20
    },
    textDark: {
        color: "#3D425C",
        marginTop: 20
    },
    coverContainer: {
        marginTop: 32,
        width: 250,
        height: 250,
        shadowColor: "#5D3F6A",
        shadowOffset: { height: 15 },
        // shadowRadius: 8,
        shadowOpacity: 0.3
    },
    cover: {
        width: 250,
        height: 250,
        // borderRadius: 125
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFF"
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#3D425C"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500"
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "rgba(93, 63, 106, 0.2)",
        borderWidth: 16,
        width: 128,
        height: 128,
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
        marginBottom: 6,
        shadowColor: "#5D3F6A",
        shadowRadius: 30,
        shadowOpacity: 0.5
    }
});