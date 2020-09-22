import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack";
import Browse from "../screens/Browse";
import Explore_korea from "../screens/Explore_korea";
import Welcome from '../screens/Welcome';
import React from "react";
import { Text } from '../components';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';
import Explore_europe from '../screens/Explore_europe';
// import Explore_korea from '../screens/Explore_korea';
import Explore_japan from '../screens/Explore_japan';
import Explore_china from '../screens/Explore_china';
// import Browse from '../screens/Browse';
import Cameras from '../screens/Cameras';
import Product from '../screens/Product';
import Recipe from '../screens/Recipe';
import Recoding from '../screens/Recoding';
import Sevenfood from '../screens/Sevenfood';
import SurveyContainer from '../screens/SurveyContainer';
import Community from '../screens/Community';
import CommunityWrite from '../screens/CommunityWrite';
import search_rendering from '../screens/search_rendering';
import FollowList from '../screens/FollowList';
import Survey from '../screens/Survey';
import Total from '../screens/Total'
import CommunityHome from '../screens/CommunityHome';

const Home = createStackNavigator(
    {
        Sevenfood: Sevenfood,
        Explore_korea: Explore_korea,
        Explore_china: Explore_china,
        Explore_japan: Explore_japan,
        Explore_europe: Explore_europe,
        Cameras: Cameras,
        Recoding: Recoding,
        Product: Product,
        Recipe: Recipe,
        search_rendering:search_rendering
    }
);
const welcoms = createStackNavigator(
    {
       Welcome : Welcome,
       Login : Login,
       Signup : Signup,
        Forgot: Forgot,
        SurveyContainer: SurveyContainer

    }
  );
// const Mypage = createStackNavigator(
//     {
//         Welcome : Welcome,
//         Login : Login,
//         Signup : Signup,
       
//     }
// );
const Community2 = createStackNavigator(
    {
        Community: Community,
        CommunityWrite: CommunityWrite,
        FollowList: FollowList
    }
);
const TapNavigation2 = createBottomTabNavigator(
    {
        Home : Home,
        heart  : Explore_korea,
       // Mypage : Mypage,
        Community : Community2
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let icon = "▲";

                if (routeName === 'Home') {
                    icon = "🏠";
                } else if (routeName === 'heart') {
                    icon = "❤️"
                } else if (routeName === 'Community') {
                    icon = "🌎"
                } else icon = "🧘"


                // can use react-native-vector-icons
                // <Icon name={iconName} size={iconSize} color={iconColor} />
                return <Text style={{ color: focused && "#46c3ad" || "#888" }}>{icon}</Text>
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888",
        },
    }
);
const TapNavigation = createStackNavigator({
    Welcome: welcoms,
    TabNavigator: {
        screen: TapNavigation2,
        navigationOptions: {
            headerShown: false,
        },
    },
});
export default createAppContainer(TapNavigation)