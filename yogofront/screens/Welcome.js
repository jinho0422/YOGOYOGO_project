import React, { Component } from 'react';
import { Animated, Dimensions, Image, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';

import { Button, Block, Text } from '../components';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    scrollX = new Animated.Value(0);

    state = {
        showTerms: false,

    }
    renderTermsService() {
        return (
            <Modal animationType="slide" visible={this.state.showTerms}>
                <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
                    <Text h2 light> 사용설명서~ </Text>

                    <ScrollView style={{ paddingVertical: theme.sizes.padding }}>
                        <Text caption gray height ={18}>내용넣기</Text>                  
                    </ScrollView>
                    <Button gradient onPress={() => this.setState({ showTerms: false })}>
                        <Text center white> understand</Text>
                    </Button>
                </Block>
            </Modal>
        )
    }

    renderIllustrations() {
        const { illustrations } = this.props;

        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extraDate={this.state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: 'visible' }}
                    />
                )}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { x: this.scrollX } }
                    }
                ])}
            />
        )
    }

    renderSteps() {
        const { illustrations } = this.props;
        const stepPosition = Animated.divide(this.scrollX, width)
        return (
            <Block row center middle style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Block animated flex={false} key={`step-${index}`} color="gray" style={[styles.steps, { opacity }]} />
                    )
                })}
            </Block>
        )
    }


    render() {
        const { navigation } = this.props;

        return (
            <Block>
                <Block center bottom flex={0.5}>
                    <Text h1 center bold>
                        YOGO.
                <Text h1 primary>YOGO.</Text>
                    </Text>
                    <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>요리보고.요리듣고.</Text>
                </Block>
                <Block center middle>
                    {this.renderIllustrations()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        <Text center bold white>Login</Text>
                    </Button>
                    <Button shadow onPress={() => navigation.navigate('Signup')}>
                        <Text center bold>Signup</Text>
                    </Button>
                    <Text center onPress={() => this.setState({ showTerms: true })}>
                        <Text center caption gray>Terms of service</Text>
                    </Text>
                    {this.renderTermsService()}
                </Block>
                
            </Block>
        )
    }
}


Welcome.defaultProps = {
    illustrations: [
        { id: 1, source: require('../assets/images/illustration_1.png') },
        { id: 2, source: require('../assets/images/illustration_2.png') },
        { id: 3, source: require('../assets/images/illustration_3.png') },
        { id: 4, source: require('../assets/images/illustration_4.png') },
        { id: 5, source: require('../assets/images/illustration_5.png') },
    ],
};

export default Welcome;


const styles = StyleSheet.create({
    stepsContainer: {
        position: 'absolute',
        bottom: theme.sizes.base * 2.5,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },

})