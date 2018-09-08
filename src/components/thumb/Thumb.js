import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';

export default class Thumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const testUsername = 'tk26';

        return (
            <View>
                <Image source={require('../../../assets/thumb-horizontal-logo.png')} />
                <Text>Hello from thumb!</Text>
                <Button
                    onPress={() => {
                        testUsername === global.username ? this.props.navigation.navigate('Profile')
                            : this.props.navigation.navigate('PublicProfile', { username: testUsername });
                    }}
                    title={"@" + testUsername}
                />
            </View>
        );
    }
}