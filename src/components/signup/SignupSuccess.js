import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

export default class SignupSuccess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />
                <View>
                    <Text>
                        Welcome to thumb!
                    </Text>
                </View>

                <View>
                    <Text>
                        We have just sent you a confirmation email. Please check your inbox. If you did not receive
                        our confirmation email, please let us know by emailing thumb support -
                        <Text style={{color: 'blue'}}>
                            support@thumbtravel.com
                        </Text>
                    </Text>
                </View>

                <Button title="LOGIN" onPress={() => this.props.navigation.navigate('LoginScreen')} />
            </View>
        );
    }
}