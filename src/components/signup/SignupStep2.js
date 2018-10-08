import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUpdate, submitStep2 } from '../../actions';
import { Card, CardSection, Header, BackButton, HeaderText3, Spinner,
  Button, Input, Space, Container, StandardText, ErrorText } from '../common';
import PasswordInput from '../auth/PasswordInput';
import NavigationService from '../../services/NavigationService';

class SignupStep2 extends Component {
    onPasswordChange(text){
        this.props.signupUpdate({prop: 'password', value: text});
    }
    onConfirmPasswordChange(text){
        this.props.signupUpdate({prop: 'confirmPassword', value: text});
    }
    next() {
        const { password, confirmPassword } = this.props;
        this.props.submitStep2({ password, confirmPassword });

        // validation success
        this.props.navigation.navigate('SignupStep3', {
            user: {
                firstName: this.props.navigation.state.params.user.firstName,
                lastName: this.props.navigation.state.params.user.lastName,
                username: this.props.navigation.state.params.user.username,
                password: this.props.password
            }
        })
    }
    renderError(){
      if(this.props.error !== ''){
          return (
              <CardSection>
                  <ErrorText>
                      {this.props.error}
                  </ErrorText>
              </CardSection>
          );
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
                <CardSection>
                  <HeaderText3 headerText="Create a password." />
                </CardSection>
                <CardSection>
                  <StandardText>
                      Your password must be: {'\n'}
                      - At least 8 characters {'\n'}
                      - Use a combination of upper and lowercase letters {'\n'}
                      - Use at least one special character {'\n'}
                      - Use at least one number {'\n'}
                  </StandardText>
                </CardSection>
                <PasswordInput
                  placeholder="password"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
                <PasswordInput
                  placeholder="confirm password"
                  onChangeText={this.onConfirmPasswordChange.bind(this)}
                  value={this.props.confirmPassword}
                />
                <CardSection>
                  <Button onPress={() => this.next()}>next</Button>
                </CardSection>
                {this.renderError()}
              </Card>
            </Container>
        );
    }
}


const mapStateToProps = ({ signUp }) => {
    const { password, confirmPassword, error, loading, step2IsValid } = signUp;
    return { password, confirmPassword, error, loading, step2IsValid };
  };

  export default connect(mapStateToProps, {
    signupUpdate, submitStep2
  })(SignupStep2);
