import React from "react";
import Explore_korea_presenter from "./Explore_korea_presenter";
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
        console.log(this.props.navigation.state.params)
        const category = this.props.navigation.state.params
        const url = "category?category=" + category
        api.get(url, {
            params: {
                category: category
            }
        }).then((response) => {
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
        const { loading, data } = this.state;
        console.log(data)
        return <Explore_korea_presenter loading={loading} data={data} navigation={this.props.navigation} />
    };
}