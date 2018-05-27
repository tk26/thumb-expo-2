import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, Linking, AsyncStorage } from 'react-native';
import { getApiUrl } from './helper';
import { onLogIn } from './auth';

const initialState = {
    email: '', password: '', error: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        // client side validation
        if (!emailRegex.test(this.state.email)) {
            this.setState({ error: "Incorrect email address" });
            return;
        }
        if (this.state.email.substr(this.state.email.length - 4) !== '.edu') {
            this.setState({ error: "Email address must end in .edu" });
            return;
        }
        if (this.state.password.length < 8) {
            this.setState({ error: "Incorrect password" });
            return;
        }

        // server side validation
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        }).then(response => {
            responseStatus = response.status;
            return response.json();
        }).then(response => {
            if (responseStatus == 400) {
                this.setState({
                    error: "Invalid email or password"
                })
            }
            else if (responseStatus == 403) {
                this.setState({
                    error: "It seems that you haven't confirmed your email just yet. " +
                        "We have resent the email verification link to you. " +
                        "Please confirm your email by clicking on it. " +
                        "Feel free to email us at support@thumbtravel.com if you face any issues."
                })
            }
            else if (responseStatus == 200) {
                // validation success
                onLogIn(JSON.stringify(response.token))
                    .then(() => {
                        global.auth_token = response.token; // hack to make it work in first login run
                        global.firstName = response.firstName;
                        global.username = response.username;
                        global.profilePicture = response.profilePicture;
                        // Save user details
                        let user = {
                            firstName: response.firstName,
                            lastName: response.lastName,
                            school: response.school,
                            username: response.username,
                            profilePicture: response.profilePicture,
                            birthday: response.birthday,
                            bio: response.bio
                        }
                        AsyncStorage.setItem("user", JSON.stringify(user));
                        this.props.navigation.navigate('LoggedInTabs');
                    })
            }
            else {
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                })
            }
        }).catch(error => {
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
                    source={require('./../assets/thumb-horizontal-logo.png')}
                />
                <View>
                    <Text>
                        Log in to thumb
                    </Text>
                </View>

                <View>
                    <Text>
                        EMAIL
                    </Text>
                </View>
                <TextInput
                    maxLength={254}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({ email: email.toLowerCase(), error: '' })}
                    value={this.state.email}
                />

                <View>
                    <Text>
                        PASSWORD
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password, error: '' })}
                    value={this.state.password}
                />

                <Button title="Log In" onPress={() => this.validate()} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>

                <View>
                    <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://thumb-webapp.herokuapp.com/#/forgot')}>
                        Forgot your password?
                    </Text>
                </View>
            </View>
        );
    }
}