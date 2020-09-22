import React from "react";
import axios from 'axios';
import { View, Image, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon, Header, name } from 'native-base';
import CommnutiyCard from '../components/CommunityCard';
import { Block } from "../components";
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { FontAwesome5 } from "@expo/vector-icons";
const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000/",
});


export default class Community extends React.Component {

    state = {
        loading: true,
        data: []
    };

    async componentDidMount() {
        api.get("home").then((response) => {
            console.log(response.data)
            //images.data = response.data
            //console.log(response.data)
            this.setState({
                loading: false,
                data: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    go() {
        console.log("here")
    }
    render() {
        const { navigation } = this.props;
        return (

            <ScrollView>
                <Header>
                    {/* <Left><TouchableOpacity  onPress={this.go()}><Icon name="md-person-add" style={{ paddingLeft:10 }} /></TouchableOpacity></Left> */}
                    {/* <Body><Text>{name}</Text></Body> */}
                    <Button
                        title="레시피 추가"
                        onPress={() => navigation.navigate("CommunityWrite")}
                    />
                    <Button
                        title="팔로워"
                        onPress={() => navigation.navigate("FollowList")}
                    />
                    <Right><EntypoIcon name="back-in-time" style={{ paddingRight: 10, fontSize: 32 }} /></Right>
                </Header>

                {
                    this.state.data.map(data => < CommnutiyCard key={data.recipe_id} data={data} />)
                }
            </ScrollView>)


    };
}