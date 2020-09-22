import React, { useState, useEffect } from "react";
import { PanResponder, Dimensions, Animated, Alert } from "react-native";
import styled from "styled-components/native";
import { Block, Text } from "../components"
import axios from 'axios';



const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: #C5CCD6;
  align-items: center;
`;

const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const styles = {
    top: 50,
    height: HEIGHT / 1.5,
    width: "90%",
    position: "absolute"
};

export default (props) => {
    // console.log(props);
    const { navigation } = props;
    const [topIndex, setTopIndex] = useState(0);
    const [category, bitmask] = useState(0);
    const [category_idx, bitmask_idx] = useState(0);
    const images = props.pictures;
    const uid = props.uid;
    const nextCard = (tmp) => {
        setTopIndex(currentValue => currentValue + 1);
        if (tmp === 1) bitmask(category => category | 1 << (category_idx / 2));
        bitmask_idx(category_idx => category_idx + 1);

        if (category_idx === 9) {
            const touri = "http://k02a2031.p.ssafy.io:5000/user/" + uid + "/" + category;
            axios.post(touri);
            console.log("=========조사결과==========");
            console.log(touri);
            Alert.alert(
                '선호도 조사 성공!',
                'YOGOYOGO로 안내하겠습니다.',
                [
                    {
                        text: '확인', onPress: () => {
                            // console.log(this.state.uid)
                            navigation.navigate('Sevenfood');
                            return;
                        }
                    }
                ],
                { cancelable: false }
            )
        }
    }

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, { dx, dy }) => {
            position.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (evt, { dx, dy }) => {
            if (dx >= 200) {
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 100,
                        y: dy
                    }
                }).start(nextCard(0));
            } else if (dx <= -200) {
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH - 100,
                        y: dy
                    }
                }).start(nextCard(1));
            } else {
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    }
                }).start();
            }
        }
    });
    const roationValues = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: ["-8deg", "0deg", "8deg"],
        extrapolate: "clamp"
    });
    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.2, 1],
        extrapolate: "clamp"
    });
    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp"
    });
    useEffect(() => {
        position.setValue({ x: 0, y: 0 });
    }, [topIndex]);
    return (
        <Container>
            <Block row middle>
                <Text h3 bold>← 좋아요                				            싫어요 →</Text>
            </Block>
            {images.map((result, index) => {
                if (index < topIndex) {
                    return null;
                } else if (index === topIndex) {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                zIndex: 1,
                                transform: [
                                    { rotate: roationValues },
                                    ...position.getTranslateTransform()
                                ]
                            }}
                            key={result.image}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={result.image} />
                        </Animated.View>
                    );
                } else if (index === topIndex + 1) {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: secondCardOpacity,
                                transform: [{ scale: secondCardScale }]
                            }}
                            key={result.image}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={result.image} />
                        </Animated.View>
                    );
                } else {
                    return (
                        <Animated.View
                            style={{
                                ...styles,
                                zIndex: -index,
                                opacity: 0
                            }}
                            key={result.image}
                            {...panResponder.panHandlers}
                        >
                            <Poster source={result.image} />
                        </Animated.View>
                    );
                }
            })}
        </Container>
    );
};
