import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class Travel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image
                    source={require('./../../assets/thumb-horizontal-logo.png')}
                />
                
                <View>
                    <Text>
                        What do you want to do?
                    </Text>
                </View>

                <Button title="Ride" style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.navigate('RideStep1')} />

                <Button title="Drive" style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.navigate('DriveStep1')} />
            </View>
        );
    }
}