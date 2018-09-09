import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { getApiUrl } from '../../helper';
import { ImagePicker, Permissions } from 'expo';
import { updateProfile,  saveProfile, clearProfile } from '../../actions';

const headerPhotoMap = {
    // TODO point to header photo sources
    "indiana-university": ""
}

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    onBioChangeBind(text) {
        this.props.updateProfile({prop: 'bio', value: text});
        this.props.updateProfile({prop: 'error', value: ''});
    }

    // componentWillMount() {
    //     this.setState({
    //         firstName: global.firstName,
    //         username: global.username,
    //         profilePicture: global.profilePicture,
    //         error: ''
    //     });
    // }

    componentDidMount() {
        // AsyncStorage.getItem("user")
        //     .then(user => {
        //         user = JSON.parse(user);
        //         this.setState({
        //             headerPhoto: headerPhotoMap[user.school] || "",
        //             school: user.school,
        //             bio: user.bio
        //         });
        //     });
        this._checkPermissions();
    }

    validateAndUpdate() {
        const { profilePicture, bio } = this.props;
        this.props.saveProfile({ profilePicture, bio })
            .then( () => {
                if(this.props.profileIsSaved) {
                    // Delicate
                    this.props.navigation.state.params.refresh(profilePicture);
                }
            })
            .catch(() => {})    
    }

    _checkPermissions = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        this.props.updateProfile({prop: 'status', value: status});
        
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.props.updateProfile({prop: 'cameraRollPermission', value: cameraRollPermission});
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0
        });
      
        console.log(result);
      
        if (!result.cancelled) {
            this.props.updateProfile({prop: 'profilePicture', value: result.base64});
        }
    };

    render() {
        return (
            <View>
                {/* <Image
                    source={ this.state.headerPhoto || require('./../../assets/thumb-horizontal-logo.png') }
                /> */}
                
                <Text>First Name: {this.props.firstName}</Text>
                
                <TouchableOpacity onPress={this._pickImage }>
                    <Image
                        style={{width: 50, height: 50}}
                        source={ this.props.profilePicture.length > 0 ? 
                            { uri: 'data:image/jpeg;base64,' + this.props.profilePicture }
                            : require('../../../assets/thumb-horizontal-logo.png') }
                    />
                </TouchableOpacity>

                <Text>Username: @{this.props.username}</Text>
                
                <Text>School: {this.props.school}</Text>
                
                <Text>Bio:</Text>
                
                <TextInput
                    maxLength={100}
                    autoCorrect={true}
                    onChangeText={this.onBioChangeBind(this)}
                    placeholder="Yo, add a bio"
                    value={this.props.bio}
                />

                <Button title="UPDATE" onPress={() => this.validateAndUpdate()} />
                
                <Text>{ this.props.error }</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    const { firstName, profilePicture, username, school, bio, error, status, cameraRollPermission, profileIsSaved } = profile;
    return { firstName, profilePicture, username, school, bio, error, status, cameraRollPermission, profileIsSaved };
};

export default connect(mapStateToProps, {
    updateProfile, saveProfile, clearProfile
})(EditProfile);