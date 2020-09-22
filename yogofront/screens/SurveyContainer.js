import React, { Component } from "react";
import Survey from "./Survey";

const data = {
    results: [
        { image: require('../assets/1.jpg') }, { image: require('../assets/2.jpg') },
        { image: require('../assets/3.jpg') }, { image: require('../assets/4.jpg') },
        { image: require('../assets/5.jpg') }, { image: require('../assets/6.jpg') },
        { image: require('../assets/7.jpg') }, { image: require('../assets/8.jpg') },
        { image: require('../assets/9.jpg') }, { image: require('../assets/10.jpg') }
    ]
};
class SurveyContainer extends Component {

    render() {
        const uid = this.props.navigation.state.params.uid;
        return (
            <Survey navigation={this.props.navigation} pictures={data.results} uid={uid} />
        )
    }
};

export default SurveyContainer;