import React from "react";
import Browseload from "./Browseload";
import axios from 'axios';

const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000/",
});


export default class Explore_korea extends React.Component {
    state = {
        loading: true,
        data: []
    };

    async componentDidMount() {
        api.get("home", {
        }).then((response) => {
            console.log('Seven')
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
        const { loading, data } = this.state;
        //console.log(data)
        return <Browseload loading={loading} data={data} navigation={this.props.navigation} />
    };
}