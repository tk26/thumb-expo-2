import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { CardSection, Input, fontColors } from '../common';

const initialState = {
  securePassword: true
}

export default class PasswordInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired
  }

  constructor(props){
    super();
    this.state = initialState;
  }

  getSecurePasswordText(){
    if(this.state.securePassword){
      return 'show';
    }
    return 'hide';
  }

  toggleShowPassword() {
    const securePassword = this.state.securePassword ? false : true;
    this.setState({securePassword});
  }

  render() {
    return (
      <CardSection>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={this.state.securePassword}
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
      >
        <Text
          onPress={this.toggleShowPassword.bind(this)}
          style={styles.showStyle}
        >
          {this.getSecurePasswordText()}
        </Text>
      </Input>
    </CardSection>
    )
  }
}

const styles = {
  showStyle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: fontColors.grey,
    letterSpacing: 0,
    paddingBottom: 5
  }
};
