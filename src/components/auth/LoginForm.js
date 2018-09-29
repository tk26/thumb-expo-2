import React, { Component } from 'react';
import { Text, Linking, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../../actions';
import { Header, BackButton, Container, Card, CardSection, Input, Link1,
  Logo, Button, Spinner, StandardText } from '../common';

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
        log in
      </Button>
    );
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Card>
          <Header>
            <BackButton onPress={() => {goBack()}} />
          </Header>
          <CardSection>
            <Logo size="medium" includeText  />
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
          <CardSection>
            {this.renderButton()}
          </CardSection>
          <CardSection>
            <Link1
              onPress={() => Linking.openURL('https://thumb-webapp.herokuapp.com/#/forgot')}
              linkText="Forgot Password?"
            />
          </CardSection>
        </Card>
      </Container>
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
