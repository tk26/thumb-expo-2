import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image source={require('./../../assets/thumb-horizontal-logo.png')} />
                <Text>Hello from Home!</Text>

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