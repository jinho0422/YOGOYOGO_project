import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
export default class FollowCard extends Component{
    render() {
        const { data } = this.props; // 피드 항목 데이터
      //  const { image } = JSON.parse(data.json_metadata); // json_metadata에서 이미지 url을 파싱
        return (
            <Card>
                <CardItem>
                  <Left>
    
                    <Body>
                      {/* <Text>작성자</Text> */}
                       <Text note>{data.fid}</Text>
                    </Body>
                  </Left>
                  <Right>
                  <Button transparent>
                      <Icon name='ios-chatbubbles' style={{ color:'black', marginRight: 5 }}/>
                    </Button>
                  </Right>
                </CardItem>

                  {/* <CardItem cardBody>
                    <Image 
                      source={{ uri: data.image_url}} 
                      style={{ height:200, width:null, flex: 1 }} />
                  </CardItem> 
               */}
               
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