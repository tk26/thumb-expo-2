import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class Thumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image source={require('./../../assets/thumb-horizontal-logo.png')} />
                <Text>Hello from thumb!</Text>
            </View>
        );
    }
}