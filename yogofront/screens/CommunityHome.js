import React from "react";
import axios from 'axios';
import { View, Image, Text, StyleSheet,ScrollView , Button} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon } from 'native-base';
import FollowCard from '../components/FollowCard';
import { Block } from "../components";

export default class CommunityHome extends React.Component {
    state = {
        loading: true,
        data:[]
    };

    async componentDidMount(){
        console.log(this.props.navigation.state.params)
        const category = this.props.navigation.state.params
        const url="home/category?category="+category
        api.get("home").then((response) => {
                console.log('data')
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



    render() {
        const { loading,data } = this.state;
        console.log(data)
        return ( 
                <Block>
                      <Card>
                <CardItem>
                  <Left>
    
                    <Body>
                      <Text>작성자</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>
                </Card>
                <Card>
                <CardItem>
                  <Left>
    
                    <Body>
                      <Text>작성자</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>
                </Card>
                <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>작성자</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>
                </Card>
                <Card>
                <CardItem>
                  <Left>
    
                    <Body>
                      <Text>작성자</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>
                </Card>

                 

                </Block>
            )
       
 
    };
}