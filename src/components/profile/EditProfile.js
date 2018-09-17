import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getApiUrl } from '../../helper';
import { ImagePicker, Permissions } from 'expo';

const headerPhotoMap = {
    // TODO point to header photo sources
    "indiana-university": ""
}

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            firstName: global.firstName,
            username: global.username,
            profilePicture: global.profilePicture,
            error: ''
        });
    }

    componentDidMount() {
        AsyncStorage.getItem("user")
            .then(user => {
                user = JSON.parse(user);
                this.setState({
                    headerPhoto: headerPhotoMap[user.school] || "",
                    school: user.school,
                    bio: user.bio
                });
            });
        this._checkPermissions();
    }

    validateAndUpdate() {
        // server side validation
        let responseStatus = 0;
        fetch(getApiUrl() + '/user/edit/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "profilePicture" : this.state.profilePicture,
                "bio": this.state.bio
            })
        })
        .then( response => {
            responseStatus = response.status
            return response.json()
        })
        .then( response => {
            if(responseStatus == 400) {
                this.setState({
                    error: "Invalid user details"
                })
            }
            else if(responseStatus == 200) {
                // profile updated successfully
                this.setState({
                    error: response.message
                })
                // update global
                global.profilePicture = this.state.profilePicture;
                AsyncStorage.getItem("user")
                    .then(user => {
                        user = JSON.parse(user);
                        user.bio = this.state.bio;
                        user.profilePicture = this.state.profilePicture;
                        // update local store
                        AsyncStorage.setItem("user", JSON.stringify(user));
                    })
                    .then(() => {
                        this.props.navigation.state.params.refresh(this.state.profilePicture);
                    });
            }
            else {
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " + 
                        "please let us know at support@thumbtravel.com"
                })
            }
        })
        .catch( error => {
            // TOOD log error
            this.setState({
                error: "Some error occured. Please try again. If problem persists, " + 
                    "please let us know at support@thumbtravel.com"
            })
        })
    }

    async _checkPermissions(){
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        this.setState({ status });
    
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ cameraRollPermission: cameraRollPermission.status });
    };

    async _pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0
        });
      
        if (!result.cancelled) {
            this.setState({ profilePicture: result.base64 });
        }
    };

    render() {
        return (
            <View>
                {/* <Image
                    source={ this.state.headerPhoto || require('./../../assets/thumb-horizontal-logo.png') }
                /> */}
                
                <Text>First Name: {this.state.firstName}</Text>
                
                <TouchableOpacity onPress={this._pickImage }>
                    <Image
                        style={{width: 50, height: 50}}
                        source={ this.state.profilePicture.length > 0 ? 
                            { uri: 'data:image/jpeg;base64,' + this.state.profilePicture }
                            : require('../../../assets/thumb-horizontal-logo.png') }
                    />
                </TouchableOpacity>

                <Text>Username: @{this.state.username}</Text>
                
                <Text>School: {this.state.school}</Text>
                
                <Text>Bio:</Text>
                
                <TextInput
                    maxLength={100}
                    autoCorrect={true}
                    onChangeText={(bio) => this.setState({bio, error:''})}
                    placeholder="Yo, add a bio"
                    value={this.state.bio}
                />

                <Button title="UPDATE" onPress={() => this.validateAndUpdate()} />
                
                <Text>{ this.state.error }</Text>
            </View>
        );
    }
}