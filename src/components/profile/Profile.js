import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, clearProfile } from '../../actions';
import { NavigationService } from '../../services';

class Profile extends Component {
    constructor(props) {
      super(props);
    }

    logout() {
      this.props.logoutUser();
      this.props.clearProfile();
      NavigationService.reset();
    }

    render() {
        const { profile } = this.props;
        return (
            <View>
                <Text>First Name: {profile.firstName}</Text>

                <TouchableOpacity onPress={() =>{
                  NavigationService.navigate('EditProfile')
                }}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={ profile.profilePicture.length > 0 ?
                            { uri: 'data:image/jpeg;base64,' + profile.profilePicture }
                            : require('../../../assets/thumb-horizontal-logo.png') }
                    />
                </TouchableOpacity>

                <Button title="View and Edit Profile" style={{ alignSelf: 'center' }}
                    onPress={() => {
                      NavigationService.navigate('EditProfile')
                    }}
                />

                <Button title="Settings" style={{ alignSelf: 'center' }} onPress={() => {} }/>

                <Button title="Give us some feedback" style={{ alignSelf: 'center' }}
                    onPress={() => NavigationService.navigate('Feedback') }
                />

                <Button title="Log out" style={{ alignSelf: 'center' }}
                    onPress={this.logout.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    const { email, password, error, loading, isLoggedIn } = auth;
    return { email, password, error, loading, isLoggedIn, profile };
  };

export default connect(mapStateToProps, { logoutUser, clearProfile })(Profile);
