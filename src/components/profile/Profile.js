import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, clearProfile } from '../../actions';
import { NavigationActions, StackActions } from 'react-navigation';

const initialState = {
    firstName: '', profilePicture: '', error: ''
};

class Profile extends Component {
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

    refreshUserProfile(profilePicture){
        this.setState({ profilePicture });
    }

    logout() {
        this.props.logoutUser();
        this.props.clearProfile();
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'SignedOutStack' })],
        });
        this.props.navigation.dispatch(resetAction);
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
                            : require('../../../assets/thumb-horizontal-logo.png') }
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
                
                {/* Demo redux */}
                {/* All the actions are available through screenProps */}
                <Button title="Follow Josh" onPress={ () => {
                        this.props.screenProps.followUser('jdromine');
                }}/>
                
                <Button title="Follow Conner" onPress={ () => {
                    this.props.screenProps.followUser('cwritt');
                }}/>
                
                <Button title="Follow Tejas" onPress={ () => {
                    this.props.screenProps.followUser('tk26');
                }}/>

                <Button title="Unfollow Josh" onPress={ () => {
                        this.props.screenProps.unfollowUser('jdromine');
                }}/>
                
                <Button title="Unfollow Conner" onPress={ () => {
                    this.props.screenProps.unfollowUser('cwritt');
                }}/>
                
                <Button title="Unfollow Tejas" onPress={ () => {
                    this.props.screenProps.unfollowUser('tk26');
                }}/>

                <View> <Text>{ JSON.stringify(this.props.screenProps.social.follows) } </Text></View>
                {/* Redux demo ends */}

                <Button title="Settings" style={{ alignSelf: 'center' }} onPress={() => {} }/>

                <Button title="Give us some feedback" style={{ alignSelf: 'center' }}
                    onPress={() => this.props.navigation.navigate('Feedback') }
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