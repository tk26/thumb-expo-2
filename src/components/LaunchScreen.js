import React, { Component } from 'react';
import { View, Text, Image, Linking, Button } from 'react-native';
import { Card, CardSection, Header1, Logo } from '../components/common';

export default class LaunchScreen extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                  <Logo />
                </CardSection>
                <Header1>Welcome to thumb</Header1>

                <Button title="Login" onPress={() => this.props.navigation.navigate('LoginScreen')} />
                <Button title="Create Account" onPress={() => this.props.navigation.navigate('SignupStep1')}/>

                <Text>
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
            </Card>
        );
    }
}
