import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

export default class Notifications extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image source={require('./../../assets/thumb-horizontal-logo.png')} />
                
                <FontAwesome name="search" size={32} />

                <Text>your notifications</Text>

                <Button title="Ride" onPress={() => {
                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Travel'}),
                            NavigationActions.navigate({ routeName: 'RideStep1'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }} />
                                
                <Button title="Drive" onPress={() => { 
                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Travel'}),
                            NavigationActions.navigate({ routeName: 'DriveStep1'})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                }} />

            </View>
        );
    }
}