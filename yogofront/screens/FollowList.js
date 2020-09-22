import React from "react";
import axios from 'axios';
import { View, Image, Text, StyleSheet,ScrollView } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import FollowCard from '../components/FollowCard';
import { Block } from "../components";
const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000/",
});


export default class FollowList extends React.Component {
    state = {
        loading: true,
        data:[]
    };

    async componentDidMount(){
        axios.get("http://k02a2031.p.ssafy.io:5000/mylist/1/follow")
        .then(response => {
            //console.log('response: ', JSON.stringify(Response, null, 3))
           //console.log(response.data)
           this.setState({
            loading: false,
            data: response.data
        })
        }).catch(error => {
            console.log('failed', error)
        })
    }



    render() {
        const { loading,data } = this.state;
        console.log(data)
        return ( 
        <ScrollView>
            {
              this.state.data.map(data => <FollowCard data={ data }/>)
            }
          </ScrollView>)
       
 
    };
}