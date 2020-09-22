import React, { Component } from "react";
import Loader from '../components/Loader';
import Browse from './Browse';
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { theme, mocks } from "../constants";

const { width, height } = Dimensions.get("window");


const Browseload = ({loading, data, navigation}) => loading ? <Loader />
    : <Browse data={data} navigation= {navigation} ></Browse>

Browseload.propTypes ={
    loading: PropTypes.bool.isRequired,
    data:PropTypes.array
};

export default Browseload;