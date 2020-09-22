
 import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions ,ScrollView} from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import CommunityCard from '../components/CommunityCard';
import FollowCard from '../components/FollowCard';
import axios from 'axios';

const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000",
});

let images = [
    "https://cdn.pixabay.com/photo/2018/11/29/21/19/hamburg-3846525__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/11/16/51/ibis-3809147__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/23/14/19/forest-3833973__480.jpg",
    "https://cdn.pixabay.com/photo/2019/01/05/17/05/man-3915438__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/04/22/38/road-3856796__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/04/20/21/harley-davidson-3794909__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/25/21/45/crystal-ball-photography-3894871__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/29/23/49/rays-3902368__480.jpg",
    "https://cdn.pixabay.com/photo/2017/05/05/16/57/buzzard-2287699__480.jpg",
    "https://cdn.pixabay.com/photo/2018/08/06/16/30/mushroom-3587888__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/15/02/53/flower-3876195__480.jpg",
    "https://cdn.pixabay.com/photo/2018/12/16/18/12/open-fire-3879031__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/24/02/05/lichterkette-3834926__480.jpg",
    "https://cdn.pixabay.com/photo/2018/11/29/19/29/autumn-3846345__480.jpg"
]

const { width, height } = Dimensions.get('window');

export default class Total extends Component {
        state = {
            name: '',
            reputation: 0,
            profile: {},
            postCount: 0,
            followingCount: 0,
            followerCount: 0,
            activeIndex: 0,
            blogs: [],
            data:[],
            follower : []
        }
	// static navigationOptions = {
	// 	tabBarIcon: ({ tintColor }) => (
	// 		<Icon name='person' style={{ color: tintColor }} />
	// 	)
    // }
    componentDidMount() {
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
        
        // axios.create({
        //         baseURL: "http://k02a2031.p.ssafy.io:5000/community/recipe",
        //     }).get().then((response) => {
        //        // console.log(response.data)
        //         //images.data = response.data
        //         //console.log(response.data)
        //         this.setState({
        //             loading: false,
        //             follower: response.data
        //         })
        //     }).catch((err) => {
        //         console.log(err);
        //     })
    }

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderSectionOne = () => {
        console.log("here")
        

        return ( 
        <ScrollView>
            {
              this.state.data.map(data => <CommunityCard data={ data }/>)
            }
          </ScrollView>)
    }

    renderSectionTwo = () => {
        console.log("dfdsf");
        console.log(this.state.follower);
        <ScrollView>
              {
              this.state.data.map(data => <CommunityCard data={ data }/>)
            }
          </ScrollView>
    }

    renderSection = () => {
        console.log("액티브 인덱스" +  this.state.activeIndex)
      
        if(this.state.activeIndex === 0) {
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
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    { this.renderSectionOne() }
                </View>
            )
        }
        else if(this.state.activeIndex === 1) {
            // axios.create({
            //     baseURL: "http://k02a2031.p.ssafy.io:5000/community/recipe",
            // }).get().then((response) => {
            //     //console.log(response.data)
            //     //images.data = response.data
            //     //console.log(response.data)
            //     this.setState({
            //         loading: false,
            //         follower: response.data
            //     })
            // }).catch((err) => {
            //     console.log(err);
            // })
            api.get("home").then((response) => {
                console.log('data2')
                //images.data = response.data
                //console.log(response.data)
                this.setState({
                    loading: false,
                    data: response.data
                })
            }).catch((err) => {
                console.log(err);
            })
            return (
                <View>
                    { this.renderSectionTwo() }
                </View>
            )
        }
    }

    fetchState() {

    }

    fetchBlog(tag, limit=20, start_author='', start_permlink='') {
        const data = {
            id: 5,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_discussions_by_blog",
              [{ tag, limit, start_author, start_permlink }]
            ]
        }; // reactnative-steemjs--1546529527678
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    fetchAccount(username) {
        const data = {
            id: 3,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "database_api",
              "get_accounts",
              [[username]]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result[0])
    }

    fetchFollowCount(username) {
        const data = {
            id: 4,
            jsonrpc: "2.0",
            method: "call",
            params: [
              "follow_api",
              "get_follow_count",
              [username]
            ]
        };
        return fetch('https://api.steemit.com',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res.result)
    }

    UNSAFE_componentWillMount() {
        const username = 'anpigon';
       // this.fetchState();
        console.log("액티브 인덱스" +  this.state.activeIndex)
    }

    render() {
        const { 
            name,
            reputation,
            profile,
            postCount,
            followingCount,
            followerCount ,
            data
        } = this.state;

        return (
            <Container style={{ flex:1, backgroundColor: 'white'}}>
                <Header>
                    <Left><Icon name="md-person-add" style={{ paddingLeft:10 }} /></Left>
                    <Body><Text>{name}</Text></Body>
                    <Right><EntypoIcon name="back-in-time" style={{ paddingRight:10, fontSize: 32 }} /></Right>
                </Header>
                <Content>
                    {/* <View style={{flexDirection:'row', paddingTop:10}}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <Image source={{ url: profile.profile_image }}
                              style={{width:75, height:75, borderRadius:37.5}}/>
                        </View>
                        <View style={{flex:3}}>
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <View style={{alignItems:'center'}}>
                                    <Text>{postCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>{followingCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>follower</Text>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <Text>{followerCount}</Text>
                                    <Text style={{fontSize:10, color:'gray'}}>following</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button bordered dark
                                    style={{flex:4, marginLeft:10, justifyContent:'center', height:30, marginTop:10}}>
                                    <Text>Edit Profile</Text>
                                </Button>
                                <Button bordered dark small icon
                                 style={{flex:1, marginRight:10, marginLeft:5, justifyContent:'center', height:30, marginTop:10}}>
                                    <Icon name="settings" />
                                </Button>
                            </View>
                        </View>
                    </View> */}
                    {/* <View style={{paddingHorizontal:10, paddingVertical:10}}>
                        <Text style={{fontWeight:'bold'}}>{profile.name} ({reputation.toFixed(2)})</Text>
                        <Text>{profile.about}</Text>
                        <Text>{profile.website}</Text>
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent:'space-around', borderTopWidth:1,borderTopColor:'#eae5e5' }}>
                        <Button transparent
                                onPress={() => this.segmentClicked(0)}
                            active={this.state.activeIndex === 0}>
                            <Icon name='ios-apps' 
                                style={[ this.state.activeIndex === 0 ? {} : {color: 'grey'} ]}/>
                        </Button>
                        <Button transparent
                                onPress={() => this.segmentClicked(1)}
                            active={this.state.activeIndex === 1}>
                            <Icon name='ios-list' 
                                style={[ this.state.activeIndex === 1 ? {} : {color: 'grey'} ]}/>
                        </Button>
                        <Button transparent
                                onPress={() => this.segmentClicked(2)}
                            active={this.state.activeIndex === 2}>
                            <Icon name='ios-people' 
                                style={[ this.state.activeIndex === 2 ? {} : {color: 'grey'} ]}/>
                        </Button>
                        <Button transparent
                                onPress={() => this.segmentClicked(3)}
                            active={this.state.activeIndex === 3}>
                            <Icon name='ios-bookmark' 
                                style={[ this.state.activeIndex === 3 ? {} : {color: 'grey'} ]}/>
                        </Button>
                    </View>
                    
                    {/* 아래 코드 추가 */}
                    { this.renderSection() }
                </Content>
            </Container>
        );
    }
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

