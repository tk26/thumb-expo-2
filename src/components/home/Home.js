import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Right, Body, Button } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Permissions, Notifications } from 'expo';
import { getApiUrl } from '../../helper';
import Feed from './Feed';

const initialState = {
    error: ''
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._registerForPushNotifications();
    }

    async _registerForPushNotifications(){
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
    
        // Get the expoToken that uniquely identifies this device
        let expoToken = await Notifications.getExpoPushTokenAsync();
    
        // POST the expoToken to your backend server from where you can retrieve it to send push notifications.
        fetch(getApiUrl() + '/user/expo/token/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "expoToken" : expoToken
            })
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if (responseStatus !== 200) {
                this.setState({
                    error: "Could not set expoToken" + responseStatus
                })
            }
        })
        .catch( error => {
            // TODO log error
            this.setState({
                error: "Could not set expoToken"
            })
        })
    }

    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Body>
                        <FontAwesome name="search" size={32} />
                    </Body>
                    <Body>
                        <Text>HOME</Text>
                    </Body>
                    <Right>
                        <Button rounded small bordered light 
                            style={styles.buttonStyle} 
                            onPress={() => {
                                const resetAction = StackActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Travel'}),
                                        NavigationActions.navigate({ routeName: 'RideStep1'})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}>
                            <Text>Ride</Text>
                        </Button>                                
                        <Button rounded small bordered light 
                            style={styles.buttonStyle} 
                            onPress={() => { 
                            const resetAction = StackActions.reset({
                                    index: 1,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Travel'}),
                                        NavigationActions.navigate({ routeName: 'DriveStep1'})
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                            }}>
                            <Text>Drive</Text>
                        </Button>
                    </Right>                 
                </Header>
                <View>
                    <Feed />                    
                    <Text>{ this.state.error }</Text>
                </View>
            </Container>
        );
    }
}

const styles = {
    headerStyle : {
    },
    buttonStyle: {
        backgroundColor: 'white'
    }
}