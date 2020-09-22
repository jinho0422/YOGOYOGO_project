import React, { Component } from 'react';
import { Animated, Dimensions, Image, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';

import { Button, Block, Text, Input } from '../components';
import { theme } from '../constants';
import * as Icon from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import Explore_korea_presenter from './Explore_korea_presenter';


const { width, height } = Dimensions.get('window');



class Browse extends Component {

    // state = {
    //     searchFocus: new Animated.Value(0),
    //     searchString: null,
    //     illustrations: [],
    //     urls: [],
    //     ingredients: [],
    //     loading: true
    // }
    constructor(props) {
        super(props);
        this.state = {
            searchFocus: new Animated.Value(0),
            searchString: null,
            illustrations: [],
            urls: [],
            ingredients: [],
            loading: true
        }
        console.log('Browse')
    }

    scrollX = new Animated.Value(0.2);

    handleSearchFocus(status) {
        Animated.timing(this.state.searchFocus, {
            toValue: status ? 0.8 : 0.6, // status === true, increase flex size
            duration: 150 // ms
        }).start();
    }

    searchStrings(ingredient) {
        Axios.get("http://k02a2031.p.ssafy.io:5000/search", {
            params: {
                text: ingredient
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
        // const { loading, ingredients } = this.state;
        // console.log(ingredients);
        //return <Explore_korea_presen ter loading={loading} data={ingredients} navigation={this.props.navigation} />
    };



    renderSearch() {
        const { searchString, searchFocus } = this.state;
        const isEditing = searchFocus && searchString;

        return (
            <Block animated middle flex={searchFocus}>
                <Input
                    placeholder="Search"
                    placeholderTextColor={theme.colors.gray2}
                    style={styles.searchInput}
                    onFocus={() => this.handleSearchFocus(true)}
                    onBlur={() => this.handleSearchFocus(false)}
                    onChangeText={text => this.setState({ searchString: text })}
                    value={searchString}
                    onRightPress={() =>
                        isEditing ? this.setState({ searchString: null }) : null
                    }
                    rightStyle={styles.searchRight}
                    rightLabel={

                        <Icon.FontAwesome
                            name={isEditing ? "search" : "search"}
                            size={theme.sizes.base}
                            color={theme.colors.gray2}
                            style={styles.searchIcon} onPress={() => {
                                { searchString && this.searchStrings(searchString) };
                                console.log(searchString);
                            }}
                        />
                    }
                />
            </Block>
        );
    }

    renderIllustrations() {
        const { data, navigation } = this.props;
        return (

            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showHorizontalScrollIndicator={false}
                scrollEventThrottle={100}
                snapToAlignment="center"
                data={data}
                extraDate={this.state}
                keyExtractor={(item, index) => `${item.recipe_id}`}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={`img-${index}`}
                        onPress={() => navigation.navigate("Product", item)}
                    >
                        <Image
                            source={{ "uri": item["image_url"] }}
                            // resizeMode="contain"
                            style={{ width, height: height / 4, overflow: 'visible' }}
                        />
                    </TouchableOpacity>
                )}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { x: this.scrollX } }
                    }
                ])}

            />

        )
    }

    renderSteps() {
        const { data, navigation } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width)
        return (
            <Block row center middle style={styles.stepsContainer}>
                {data.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Block animated flex={false} key={`step-${index}`} color="gray" style={[styles.steps, { opacity }]} />
                    )
                })}
            </Block>
        )
    }

    render() {
        const { navigation } = this.props;
        return (
            <Block >
                <Block center flex={0.01}>

                </Block>
                <Block center top style={{ flex: 0.5 }}>
                    {this.renderSteps()}
                    {this.renderIllustrations()}
                </Block>
                <Block row flex={0.2} style={{ marginTop: 20 }}>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 10 }} onPress={() => navigation.navigate('Explore_korea', "한식")}>
                        <Image style={{ width: 70, height: 50 }} source={require('../assets/images/illustration_4.png')} />
                        <Text h3 center bold>한 식</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 10 }} onPress={() => navigation.navigate('Explore_korea', "중국")}>
                        <Image style={{ width: 70, height: 50 }} source={require('../assets/images/illustration_5.png')} />
                        <Text h3 center bold>중 식</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 10 }} onPress={() => navigation.navigate('Explore_korea', "일본")}>
                        <Image style={{ width: 70, height: 50 }} source={require('../assets/images/illustration_3.png')} />
                        <Text h3 center bold>일 식</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 10 }} onPress={() => navigation.navigate('Explore_korea', "서양")}>
                        <Image style={{ width: 60, height: 50 }} source={require('../assets/images/illustration_2.png')} />
                        <Text h3 center bold>양 식</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 10 }} onPress={() => navigation.navigate('Explore_korea', "동남아시아")}>
                        <Image style={{ width: 60, height: 50 }} source={require('../assets/images/illustration_1.png')} />
                        <Text h3 center bold>동남아</Text>
                    </TouchableOpacity>
                </Block>
                <Block flex={0.2} middle top margin={[0, theme.sizes.padding * 2]}>
                    {this.renderSearch()}
                </Block>
                <Block row top flex={0.5}>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 60 }} onPress={() => navigation.navigate('Cameras')}>
                        <Image style={{ width: 60, height: 50 }} source={require('../assets/images/illustration_6.png')} />
                        <Text h3 center bold>사진 검색</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 6, marginLeft: 150 }} onPress={() => navigation.navigate('Recoding')}>
                        <Image style={{ width: 60, height: 50 }} source={require('../assets/images/illustration_7.png')} />
                        <Text h3 center bold>음성 검색</Text>
                    </TouchableOpacity>
                </Block>

            </Block>
        )
    }
}


export default Browse;

const styles = StyleSheet.create({
    stepsContainer: {
        flex: 0.2,
        position: 'absolute',
        bottom: theme.sizes.base * 2,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2.5,
        backgroundColor: "rgba(142, 142, 147, 0.06)",
        borderColor: "rgba(142, 142, 147, 0.06)",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    searchIcon: {
        position: "absolute",
        right: theme.sizes.base,
        top: theme.sizes.base * 1.2
    },
    explore: {
        marginHorizontal: theme.sizes.padding * 1.25
    },

})