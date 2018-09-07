import React, { Component } from 'react';
import { View, Text, Image, Linking, Button } from 'react-native';

export default class LaunchScreen extends Component {
    render() {
        return (
            <View>
                <Image source={require('../../assets/thumb-horizontal-logo.png')} />
                <Text>Welcome to thumb</Text>
            
                <Button title="Login" onPress={() => this.props.navigation.navigate('LoginScreen')} />
                <Button title="Create Account" onPress={() => this.props.navigation.navigate('SignupStep1')}/>
                
                <Text style={{fontFamily: 'Roboto'}}>
                    By tapping Log In or Create Account, I agree to thumb's&nbsp;
                    <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.google.com')}>
                        Terms of Service
                    </Text>
                    ,&nbsp;
                    <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.google.com')}>
                        Privacy Policy
                    </Text>
                    , and&nbsp;
                    <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.google.com')}>
                        Non-discrimination Policy
                    </Text>
                    .
                </Text>
            </View>
        );
    }
}