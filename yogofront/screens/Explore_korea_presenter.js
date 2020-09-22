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

import Loader from '../components/Loader';
import { Button, Input, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import axios from "axios";
import PropTypes from "prop-types";
import Explore_korea_presenter_data from "./Explore_korea_presenter_data"
const { width, height } = Dimensions.get("window");

const Explore_korea_presenter = ({ loading, data, navigation }) => loading ? <Loader />
    : <Explore_korea_presenter_data data={data} navigation={navigation}></Explore_korea_presenter_data>

Explore_korea_presenter.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array

};

export default Explore_korea_presenter;

const styles = StyleSheet.create({
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
        top: theme.sizes.base / 1.6
    },
    explore: {
        marginHorizontal: theme.sizes.padding * 1.25
    },
    image: {
        minHeight: 100,
        maxHeight: 130,
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
