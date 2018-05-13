import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { onLogOut } from './../auth';
import { NavigationActions, StackActions } from 'react-navigation';

const initialState = {
    firstName: '', profilePicture: '', error: ''
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.setState({
            firstName: global.firstName,
            profilePicture: global.profilePicture
        });
    }

    refreshUserProfile = (profilePicture) => {
        this.setState({ profilePicture });
    }

    render() {
        return (
            <View>
                <Text>First Name: {this.state.firstName}</Text>

                <TouchableOpacity onPress={() =>{
                    this.props.navigation.navigate('EditProfile', {
                        refresh: this.refreshUserProfile
                    })
                }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={ this.state.profilePicture.length > 0 ? 
                            { uri: 'data:image/jpeg;base64,' + this.state.profilePicture }
                            : require('./../../assets/thumb-horizontal-logo.png') }
                    />
                </TouchableOpacity>

                <Text>{this.state.error}</Text>

                <Button title="View and Edit Profile" style={{ alignSelf: 'center' }}
                    onPress={() => {
                        this.props.navigation.navigate('EditProfile', {
                            refresh: this.refreshUserProfile
                        })
                    }}
                />

                <Button title="Settings" style={{ alignSelf: 'center' }} onPress={() => {} }/>

                <Button title="Give us some feedback" style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.navigate('Feedback') }
                />

                <Button title="Log out" style={{ alignSelf: 'center' }}
                    onPress={() =>
                        onLogOut()
                            .then(() => {
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    key: null,
                                    actions: [NavigationActions.navigate({ routeName: 'SignedOutStack' })],
                                });
                                this.props.navigation.dispatch(resetAction);
                            })
                    }
                />
            </View>
        );
    }
}