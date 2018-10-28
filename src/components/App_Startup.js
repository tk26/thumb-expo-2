import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';

import NavigationService from '../services/NavigationService';
import createRootNavigator from '../navigation/router';

import { AuthService } from '../services';
import { Spinner } from '../components/common';

const initialState = {
  loading: true
}

class App_Startup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  async componentDidMount(){
    this.setGlobalVariables();
    await this.loadFonts();
    this.setState({loading: false});
  }
  setGlobalVariables(){
    const { token } = this.props;
    AuthService.setAuthToken(token);
  }
  async loadFonts(){
    if (Platform.OS === 'android'){
      return await loadFontsForAndroid();
    }
  }
  render() {
    if(this.state.loading){
      return <Spinner />;
    }
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
  }
}

export default connect(mapStateToProps)(App_Startup);


const loadFontsForAndroid = async() => {
  return await Font.loadAsync({
    'HelveticaNeue-Bold': require('../../assets/fonts/HelveticaNeueBold.ttf'),
    'HelveticaNeue-Light': require('../../assets/fonts/HelveticaNeueLight.ttf'),
    'HelveticaNeue-Medium': require('../../assets/fonts/HelveticaNeueMedium.ttf'),
    'Helvetica Neue': require('../../assets/fonts/HelveticaNeueRegular.ttf'),
  });
}
