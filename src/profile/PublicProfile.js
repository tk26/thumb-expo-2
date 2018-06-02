import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { getApiUrl } from '.././helper';

const initialState = {
    firstName: '', lastName: '', school: '', profilePicture: '', error: ''
}

export default class PublicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state.username = this.props.navigation.state.params.username;
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/profile/' + this.state.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            }
        }).then( response => {
            responseStatus = response.status;
            return response.json();
        }).then( response => {
            if (responseStatus === 200) {
                this.setState({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    school: response.school,
                    profilePicture: response.profilePicture
                });
            }
            else {
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                });
            }
        }).catch(error => {
            // TODO log error
            this.setState({
                error: "Some error occured. Please try again. If problem persists, " +
                    "please let us know at support@thumbtravel.com"
            });
        });
    }

    render() {
        return (
            <View>
                <Image source={require('./../../assets/thumb-horizontal-logo.png')} />
                <Text>Retrieving public profile of @{this.state.username}</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={ this.state.profilePicture.length > 0 
                        ? { uri: 'data:image/jpeg;base64,' + this.state.profilePicture }
                        : require('./../../assets/thumb-horizontal-logo.png') }
                />
                <Text>
                    {this.state.firstName}
                    {'\n'}
                    {this.state.lastName}
                    {'\n'}
                    {this.state.school}
                </Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title = "Dismiss"
                />
                <Text>{this.state.error}</Text>
            </View>
        );
    }
}