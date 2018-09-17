import React, { Component } from 'react';
import { Text, Linking, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../../actions';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onLogoutPress() {
    this.props.logoutUser();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Image
          source={require('../../../assets/thumb-horizontal-logo.png')}
        />
        <CardSection>
            <Text>
                Log in to thumb
            </Text>
        </CardSection>        
        <CardSection>
          <Input
            label="Email"
            placeholder="email@university.edu"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
        <CardSection>
          <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://thumb-webapp.herokuapp.com/#/forgot')}>
              Forgot your password?
          </Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth, profile }) => {
  const { email, password, error, loading, isLoggedIn } = auth;
  return { email, password, error, loading, isLoggedIn, profile };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, logoutUser
})(LoginForm);