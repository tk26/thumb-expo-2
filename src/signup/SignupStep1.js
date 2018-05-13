import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { API_URL } from 'react-native-dotenv';

const initialState = {
    firstName: '', lastName: '', username: '', error: ''
};

const usernameRegex = /^[a-z0-9._]{3,30}$/;

export default class SignupStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        // client side validation
        if (this.state.firstName.length < 1) {
            this.setState({ error: "First Name cannot be empty" });
            return;
        }
        if (this.state.lastName.length < 1) {
            this.setState({ error: "Last Name cannot be empty" });
            return;
        }
        if (!usernameRegex.test(this.state.username)) {
            this.setState({
                error: "Username should be between 3 to 30 characters " +
                    "and can only contain numbers, letters, periods and underscores"
            })
            return;
        }

        // server side validation
        let responseStatus = 0;
        fetch(API_URL + '/user/validate/username/' + this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                responseStatus = response.status
                return response.json()
            })
            .then(response => {
                if (responseStatus == 422) {
                    this.setState({
                        error: "Invalid username"
                    })
                }
                else if (responseStatus == 409) {
                    this.setState({
                        error: "Duplicate username"
                    })
                }
                else if (responseStatus == 200) {
                    // validation success
                    this.props.navigation.navigate('SignupStep2', {
                        user: {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            username: this.state.username
                        }
                    });
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
                <View>
                    <Text>
                        What's your name?
                    </Text>
                    <Text>
                        FIRST NAME
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={(firstName) =>
                        this.setState({
                            firstName,
                            error: '',
                        })
                    }
                    value={this.state.firstName}
                />
                <View>
                    <Text>
                        LAST NAME
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={(lastName) =>
                        this.setState({
                            lastName,
                            error: '',
                        })
                    }
                    value={this.state.lastName}
                />
                <View>
                    <Text>
                        Choose your username.
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(username) => {
                        this.setState({
                            username: username.toLowerCase(),
                            error: '',
                        })
                    }}
                    value={this.state.username}
                />
                
                <Button title="NEXT" onPress={() => this.validate()} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}