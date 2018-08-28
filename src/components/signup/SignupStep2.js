import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const initialState = {
    password: '', confirmPassword: '', error: ''
};

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

export default class SignupStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        if (this.state.password.length < 8 || this.state.password.length > 30) {
            this.setState({ error: "Password should be between 8 to 30 characters" });
            return;
        }
        if (!passwordRegex.test(this.state.password)) {
            this.setState({
                error: "Password should be a combinaton of upper and lowercase letters, " +
                "a number and a special character"
            })
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: "Password and Confirm Password do not match" });
            return;
        }
        // validation success
        this.props.navigation.navigate('SignupStep3', {
            user: {
                firstName: this.props.navigation.state.params.user.firstName,
                lastName: this.props.navigation.state.params.user.lastName,
                username: this.props.navigation.state.params.user.username,
                password: this.state.password
            }
        })
    }

    render() {
        return (
            <View>
                <View>
                    <Text>
                        Create a password. {'\n'}
                        Your password must be: {'\n'}
                        - At least 8 characters {'\n'}
                        - Use a combination of upper and lowercase letters {'\n'}
                        - Use at least one special character {'\n'}
                        - Use at least one number {'\n'}
                    </Text>
                </View>

                <View>
                    <Text>
                        PASSWORD
                    </Text>
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password, error: '' })}
                    value={this.state.password}
                />

                <View>
                    <Text>
                        CONFIRM PASSWORD
                    </Text>
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword, error: '' })}
                    value={this.state.confirmPassword}
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