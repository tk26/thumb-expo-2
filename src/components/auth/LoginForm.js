import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../../actions';
import { Header, BackButton, Container, Card, CardSection, Input, Link1,
  ErrorText, Logo, Button, Space, Spinner, fontColors } from '../common';
import PasswordInput from './PasswordInput';
import NavigationService from '../../services/NavigationService';

const initialState = {
  securePassword: true
}

export class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }
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
  renderErrorText(){
    if(this.props.error !== ''){
      return (
        <CardSection>
          <ErrorText>{this.props.error}</ErrorText>
        </CardSection>
      )
    }
    return null;
  }

  render() {
    return (
      <Container>
        <Header>
          <BackButton onPress={NavigationService.goBack} />
        </Header>
        <Card>
          <Space height={30} />
          <CardSection>
            <Logo size="small" includeText />
          </CardSection>
          <Space height={30} />
          <CardSection>
            <Input
              label="Email"
              placeholder="email@university.edu"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>
          <PasswordInput
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
          />
          {this.renderErrorText()}
          <CardSection>
            {this.renderButton()}
          </CardSection>
          <Space height={30} />
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

const mapStateToProps = ({ auth, profile }) => {
  const { email, password, error, loading, isLoggedIn } = auth;
  return { email, password, error, loading, isLoggedIn, profile };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, logoutUser
})(LoginForm);
