import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';


export default class CommnutiyCard extends Component{
  gogo() {
    console.log("hello")
  }

  render() {
        const { data } = this.props; // 피드 항목 데이터
      //  const { image } = JSON.parse(data.json_metadata); // json_metadata에서 이미지 url을 파싱
        return (
            <Card>
                <CardItem>
                  <Left>
                    <Body>
                      <Text>작성자</Text>
                      <Text note>{new Date(data.created_at).toDateString()}</Text>
                    </Body>
                  </Left>
                </CardItem>

                  <CardItem cardBody>
                    <Image 
                      source={{ uri: data.image_url}} 
                      style={{ height:200, width:null, flex: 1 }} />
                  </CardItem> 
                  <CardItem style={{ height:45 }}>
                  <Left>
                    <Button transparent onPress={() => this.gogo()}>
                    <Icon name='ios-heart' style={{ color:'black', marginRight: 5 }}/>
                     
                      <Text>{data.favorites}</Text>
                    </Button>
                    <Button transparent>
                      <Icon name='ios-chatbubbles' style={{ color:'black', marginRight: 5 }}/>
                      <Text>dd</Text>
                    </Button>
                  </Left>
                  {/* <Right>
                    <Text>{ data.pending_payout_value }</Text>
                  </Right> */}
                </CardItem>
                {/* <CardItem style={{ height: 5 }}>
                  <Text>{ data.favorites } likes</Text>
                </CardItem> */}
                <CardItem>
                  <Text>
                 {data.summary}
                  </Text>
                </CardItem>
               
            </Card>
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