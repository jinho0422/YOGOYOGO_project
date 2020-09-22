import axios from "axios";
import { getLightEstimationEnabled } from "expo/build/AR";

const api = axios.create({
    baseURL: "http://k02a2031.p.ssafy.io:5000/",
});




const products = [
    {
        id: 1,
        name: "16 Best Plants That Thrive In Your Bedroom",
        description:
            "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
        tags: ["Interior", "27 m²", "Ideas"],
        images: [
            require("../assets/images/plants_1.png"),
            require("../assets/images/plants_2.png"),
            require("../assets/images/plants_3.png"),
            // showing only 3 images, show +6 for the rest
            require("../assets/images/plants_1.png"),
            require("../assets/images/plants_2.png"),
            require("../assets/images/plants_3.png"),
            require("../assets/images/plants_1.png"),
            require("../assets/images/plants_2.png"),
            require("../assets/images/plants_3.png")
        ]
    }
];

// function getKorea(){
//     var images;
//     console.log('getKorea')
//     console.log(images) 
//     api.get("home").then((response) => {
//         console.log('data')
//         //images.data = response.data
//         console.log(response.data)
//         return response.data
//     }).catch((err) => {
//         console.log(err);
//     })
//    // return images;
// }
// const explore_korea =  {
//      korea_image : getKorea()
// }
const explore_china = [
    // images

    require("../assets/images/explore_2.png"),
    require("../assets/images/explore_3.png"),
    require("../assets/images/explore_4.png"),
    require("../assets/images/explore_5.png"),
    require("../assets/images/explore_6.png"),
    require("../assets/images/explore_1.png"),
];
const explore_japan = [
    // images

    require("../assets/images/explore_3.png"),
    require("../assets/images/explore_4.png"),
    require("../assets/images/explore_5.png"),
    require("../assets/images/explore_6.png"),
    require("../assets/images/explore_1.png"),
    require("../assets/images/explore_2.png"),
];
const explore_europe = [
    // images

    require("../assets/images/explore_4.png"),
    require("../assets/images/explore_5.png"),
    require("../assets/images/explore_6.png"),
    require("../assets/images/explore_1.png"),
    require("../assets/images/explore_2.png"),
    require("../assets/images/explore_3.png"),
];

const profile = {
    username: 'jinho',
    location: 'seoul',
    email: 'jinho@naver.com',
    avatar: require('../assets/images/avatar.png'),
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false,
};

export {
    api,
    products,
    profile,
    //explore_korea,
    explore_china,
    explore_japan,
    explore_europe,
}