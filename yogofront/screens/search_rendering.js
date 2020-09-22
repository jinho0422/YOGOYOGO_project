import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Divider, Button, Input, Block, Text, card } from "../components";
import { theme, mocks } from "../constants";
import axios from "axios";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");


class search_rendering extends Component {

    // state = {
    //     searchFocus: new Animated.Value(0.6),
    //     // searchString: null,

    // };

    constructor(props) {
        super(props);
        this.state = {
            searchFocus: new Animated.Value(0.6),
            data: this.props.navigation.state.params.data,
            heart: false,
        }
        console.log('searching_rendering')
        //console.log(this.state.data)
    }
    searchString = null;

    handleSearchFocus(status) {
        Animated.timing(this.state.searchFocus, {
            toValue: status ? 0.8 : 0.6, // status === true, increase flex size
            duration: 150 // ms
        }).start();
    };

    searchStrings(names) {
        axios.get("http://k02a2031.p.ssafy.io:5000/search", {
            params: {
                text: names
            }
        })
            .then((res) => {
                console.log(names),
                    this.setState({
                        data: res.data
                    })
            }
            )
            .catch((err) =>
                console.log(err))
    }

    renderSearch() {
        const { searchString, searchFocus } = this.state;
        const isEditing = searchFocus && searchString;

        return (
            <Block animated middle flex={searchFocus} style={styles.search}>
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
                            style={styles.searchIcon}
                            onPress={() => {
                                { searchString && this.searchStrings(searchString) };
                                console.log(searchString)
                            }}
                        />

                    }
                />
            </Block>
        );
    }

    renderImage(product, index) {

        const { navigation } = this.props;
        const sizes = Image.resolveAssetSource(product);
        const fullWidth = width - theme.sizes.padding * 2.5;
        const resize = (sizes.width * 100) / fullWidth;
        const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;
        const uri = product["image_url"]
        return (
            <TouchableOpacity
                key={`img-${index}`}
                onPress={() => navigation.navigate("Product", product)} // navigation props -> recipe
            >
                <Image
                    source={{ "uri": uri }}
                    style={{ width: 400, height: 200, marginBottom: 10 }}
                />
                <Text h3 bold>요리명  : {product["recipe_name"]}</Text>
                <Text h3 bold>조리시간:{product["cooking_time"]}</Text>
                <Divider margin={[theme.sizes.padding * 0.9, 0]} />
            </TouchableOpacity>
        );
    }

    renderExplore() {
        const { navigation } = this.props;
        const { data } = this.state;
        var mainImage = require("../assets/images/plants_1.png");

        if (data === null) {
            alert('nono');
        }

        return (
            <Block style={{ marginBottom: height / 3 }}>

                <Block row space="between" wrap>
                    {data.slice(0).map((img, index) => this.renderImage(img, index))}
                </Block>
            </Block>
        );
    }

    // renderFooter() {
    //     return (
    //         <LinearGradient
    //             locations={[0.5, 1]}
    //             style={styles.footer}
    //             colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.6)"]}
    //         >
    //             <Button gradient style={{ width: width / 2.678 }}>
    //                 <Text bold white center>
    //                     Filter
    //       </Text>
    //             </Button>
    //         </LinearGradient>
    //     );
    // }

    render() {
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>
                        Explore
          </Text>
                    {this.renderSearch()}
                </Block>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
                    {this.renderExplore()}
                </ScrollView>

                {/* {this.renderFooter()} */}
            </Block>
        );
    }
}

// Explore_korea.defaultProps = {
//     images: mocks.explore_korea.korea_image
// };

export default search_rendering;

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingVertical: theme.sizes.padding
    },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
    },
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2,
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
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base * 0.5
    },
    explore: {
        marginHorizontal: theme.sizes.padding * 1.25
    },
    image: {
        // minHeight: ,
        // maxHeight: 130,
        maxWidth: width - theme.sizes.padding * 2.5,
        marginBottom: theme.sizes.base,
        borderRadius: 4
    },
    mainImage: {
        minWidth: width - theme.sizes.padding * 7,
        minHeight: width - theme.sizes.padding * 7,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        overflow: "visible",
        alignItems: "center",
        justifyContent: "center",
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 4
    }
});
