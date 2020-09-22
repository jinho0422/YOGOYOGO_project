import React, { Component } from 'react';
import { Animated, Dimensions, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";

import { Button, Divider, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";

import axios from 'axios';

const { width, height } = Dimensions.get("window");


class Product extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerRight: () => (
    //             <Button onPress={() => {}}>
    //                 <Icon.Entypo name="dots-three-horizontal"  color={theme.colors.gray} />
    //             </Button>
    //         )
    //     };
    // }
    state = {
        heart: false
    }

    renderGallery() {
        const product = this.props.navigation.state.params;
        return (
            <FlatList horizontal pagingEnabled scrollEnabled showsHorizontalScrollIndicator={false} snapToAlignment="center"
                data={product["image_url"]} keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => (
                    <Image source={{ "uri": item }} resizeMode="contain" style={{ width, height: height / 2.8 }} />
                )} />
        );
    }

    favori() {
        const product = this.props.navigation.state.params;
        console.log(product)
        this.setState({ heart: !this.state.heart })
        axios.post("http://k02a2031.p.ssafy.io:5000/mylist/16/favorite/" + product.recipe_id,
            this.state.heart
        )

        console.log(this.state.heart);
    }

    render() {
        const { navigation } = this.props;
        const product = this.props.navigation.state.params;
        const url = product["image_url"]
        console.log('props')
        // console.log(url)
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Block style={styles.product} >
                    <Image source={{ "uri": product["image_url"] }} resizeMode="contain" style={{ width: 350, height: height / 2.8, flex: 1, }} />
                    <Divider margin={[theme.sizes.padding * 0.9, 0]} />
                    <Text h2 bold>{product["recipe_name"]}</Text>
                    <Text gray light height={22}>{product["summary"]} </Text>

                    <Block flex={false} row margin={[theme.sizes.base, 0]} >
                        <Text caption gray style={styles.tag} >
                            {product["calorie"]}
                        </Text>
                        <Text caption gray style={styles.tag} >
                            {product["cooking_time"]}
                        </Text>
                        <Text caption gray style={styles.tag} >
                            level:{product["level_nm"]}
                        </Text>
                        <Text caption gray style={styles.tag} >
                            {product["qnt"]}
                        </Text>
                    </Block>

                    <Icon.AntDesign
                        onPress={() => this.favori()}
                        name= {this.state.heart ?  "heart" :"hearto"}
                        size={theme.sizes.base * 2}
                    />
             
                    <Divider margin={[theme.sizes.padding * 0.9 , 0]} />
                    <Button color="rgba(197,204,214,0.20)" onPress={() => navigation.navigate('Recipe', product)}>
                        <Text center>yogo start</Text> 
                    </Button>
                    <Divider margin={[theme.sizes.padding * 0.9, 0]} />

                </Block>
            </ScrollView>
        )
    }
}

// Product.defaultProps = {
//     product: mocks.products[0],
// }

export default Product;

const styles = StyleSheet.create({
    product: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingVertical: theme.sizes.padding
    },
    tag: {
        borderColor: theme.colors.gray2,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.sizes.base,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base / 2.5,
        marginRight: theme.sizes.base * 0.625
    },
    image: {
        width: width / 3.26,
        height: width / 3.26,
        marginRight: theme.sizes.base
    },
    more: {
        width: 55,
        height: 55
    }
});