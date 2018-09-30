import React, { Component } from 'react';
import { Linking, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../../actions';
import { Header, BackButton, Container, Card, CardSection, Input, Link1,
  ErrorText, Logo, Button, Space, Spinner } from '../common';

const initialState = {
  securePassword: true
}

class LoginForm extends Component {
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
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Card>
          <Header>
            <BackButton onPress={() => {goBack()}} />
          </Header>
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
          <CardSection>
            <Input
              secureTextEntry={this.state.securePassword}
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            >
              <Text
                onPress={this.toggleShowPassword.bind(this)}
                style={styles.showStyle}
              >
                {this.getSecurePasswordText()}
              </Text>
            </Input>
          </CardSection>
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

const styles = {
  showStyle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#757575',
    letterSpacing: 0,
    paddingBottom: 5
  }
};
const mapStateToProps = ({ auth, profile }) => {
  const { email, password, error, loading, isLoggedIn } = auth;
  return { email, password, error, loading, isLoggedIn, profile };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, logoutUser
})(LoginForm);
