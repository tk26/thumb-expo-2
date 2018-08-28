import React, { Component } from 'react';
import { View, Text, Button, Image, Linking } from 'react-native';
import { getApiUrl } from '../../helper';
import { NavigationActions, StackActions } from 'react-navigation';

export default class SignupStep4 extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params.user;
        this.state.error = ''
    }

    submitUser() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "school": this.state.university,
                "password": this.state.password,
                "username": this.state.username,
                "birthday": this.state.birthday
            })
        })
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(response => {
                if (responseStatus == 400) {
                    this.setState({
                        error: "Missing one or more user details"
                    })
                }
                else if (responseStatus == 200) {
                    // account created successfully
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'SignupSuccess' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
                else {
                    this.setState({
                        error: "Some error occured. Please try again. If problem persists, " +
                            "please let us know at support@thumbtravel.com"
                    })
                }
            })
            .catch(error => {
                // TODO log error
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                })
            })
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />
                <View>
                    <Text>
                        Before you join
                    </Text>
                </View>

                <View>
                    <Text>
                        Please commit to respecting everyone in the thumb community
                        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.google.com')}>
                            Learn More
                        </Text>
                    </Text>
                </View>

                <View>
                    <Text>
                        By clicking "Continue", I agree to treat everyone in the thumb community -
                        regardless of their race, religion, national origin, ethnicity, disability, gender identity,
                        sexual orientation or age - with respect, and without judgement or bias.
                    </Text>
                </View>

                <Button title="CONTINUE" onPress={() => this.submitUser()} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}