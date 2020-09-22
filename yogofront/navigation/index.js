// import React from 'react';
// import { Image } from 'react-native';
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// import Welcome from '../screens/Welcome';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup';
// import Forgot from '../screens/Forgot';
// import Explore_europe from '../screens/Explore_europe';
// import Explore_korea from '../screens/Explore_korea';
// import Explore_japan from '../screens/Explore_japan';
// import Explore_china from '../screens/Explore_china';
// import Browse from '../screens/Browse';
// import Cameras from '../screens/Cameras';
// import Product from '../screens/Product';
// import Recipe from '../screens/Recipe';
// import Recoding from '../screens/Recoding';
// // import Settings from '../screens/Settings';

// import { theme } from '../constants';
// import TapNavigation from './TapNavigation';
const screens = createStackNavigator({
    Welcome,
    Login,
    Signup,
    Forgot,
    Explore_europe,
    Explore_korea,
    Explore_japan,
    Explore_china,
    Browse,
    Recoding,
    Recipe,
    Cameras,
    Product
    // Settings,

// }, {
//     defaultNavigationOptions: {
//         headerStyle: {
//             height: theme.sizes.base * 4,
//             backgroundColor: theme.colors.white,
//             borderBottomColor: "transparent",
//             elevation: 0,
//         },
//         headerBackImage: () => <Image source={require('../assets/icons/back.png')} />,
//         headerBackTitle: null,
//         headerLeftContainerStyle: {
//             alignItems: 'center',
//             marginLeft: theme.sizes.base * 2,
//             paddingRight: theme.sizes.base,
//         },
//         headerRightContainerStyle: {
//             alignItems: 'center',
//             paddingRight: theme.sizes.base,
//         },
//         // TabNavigator: {
//         //     screen: TapNavigation,
//         //     // navigationOptions: ({navigation}) => ({
//         //     //     header: null,
//         //     // }),
//         // },
//     }
// });


// export default createAppContainer(screens);