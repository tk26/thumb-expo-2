import React, { Component } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { getApiUrl } from '.././helper';

const initialState = {
    firstName: '', lastName: '', school: '', profilePicture: '', 
    followsMe: false, followedByMe: false, error: ''
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
                    profilePicture: response.profilePicture,
                    followsMe: response.follows.find( _ => _.username === global.username),
                    followedByMe: response.followedBy.find( _ => _.username === global.username),
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

    followUser() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/follow/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "toUsername" : this.state.username,
            })
        }).then( response => {
            responseStatus = response.status;
            return response.json();
        }).then( response => {
            if (responseStatus === 200) {
                this.setState({ followedByMe: true });
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

    unfollowUser() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/unfollow/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "toUsername" : this.state.username,
            })
        }).then( response => {
            responseStatus = response.status;
            return response.json();
        }).then( response => {
            if (responseStatus === 200) {
                this.setState({ followedByMe: false });
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

    alertUnfollow() {
        Alert.alert(
            '@' + this.state.username,
            'Are you sure you want to unfollow ?',
            [
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'Confirm', onPress: () => this.unfollowUser(), style: 'destructive'},
            ],
            { cancelable: false }
        );
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
                    {'\n'}
                    {this.state.followsMe ? "Follows You" : ""}
                </Text>

                <Button
                    onPress={() => !this.state.followedByMe ? this.followUser() : this.alertUnfollow()}
                    title={this.state.followedByMe ? "Following" : "Follow"}
                    color={this.state.followedByMe ? "#808080" : "#4286f4"}
                />

                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
                <Text>{this.state.error}</Text>
            </View>
        );
    }
}