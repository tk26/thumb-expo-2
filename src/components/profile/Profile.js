import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser, clearProfile } from '../../actions';
import { Container, Header, Card, CardSection, Button, HeaderText1 } from '../common';
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
            <Container>
              <Header includeBackButton />
              <Card>
                <CardSection>
                  <HeaderText1 headerText={profile.firstName}/>
                  <TouchableOpacity onPress={() =>{
                    NavigationService.navigate('EditProfile')
                  }}>
                      <Image
                          style={{width: 50, height: 50}}
                          source={ profile.profilePicture.length > 0 ?
                              { uri: profile.profilePicture }
                              : require('../../../assets/thumb-horizontal-logo.png') }
                      />
                  </TouchableOpacity>
                </CardSection>
                <CardSection>
                  <Button onPress={() => {NavigationService.navigate('EditProfile')}}>
                    View and Edit Profile
                  </Button>
                </CardSection>
                <CardSection>
                  <Button onPress={() => {} }>
                    Settings
                  </Button>
                </CardSection>
                <CardSection>
                  <Button onPress={() => NavigationService.navigate('Feedback') }>
                    Give us some feedback
                  </Button>
                </CardSection>
                <CardSection>
                  <Button onPress={this.logout.bind(this)}>
                    Log out
                  </Button>
                </CardSection>
              </Card>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile }) => {
    const { email, password, error, loading, isLoggedIn } = auth;
    return { email, password, error, loading, isLoggedIn, profile };
  };

export default connect(mapStateToProps, { logoutUser, clearProfile })(Profile);
