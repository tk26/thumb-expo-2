import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavigationService from '../services/NavigationService';
import createRootNavigator from '../navigation/router';

import { AuthService } from '../services';

class App_Startup extends Component {
  setGlobalVariables(){
    const {  token } = this.props;
    const { firstName, profilePicture } = this.props.profile;
    debugger;
    AuthService.setAuthToken(token);
    global.firstName = firstName;
    global.profilePicture = profilePicture;
  }
  render() {
    this.setGlobalVariables();
    const { isLoggedIn } = this.props;
    const TopLevelNavigationContainer = createRootNavigator(isLoggedIn);
    return <TopLevelNavigationContainer 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
      />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(App_Startup);