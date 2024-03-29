import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUpdate, submitStep1, dispatchUncaughtError } from '../../actions';
import { Card, CardSection, Header, HeaderText3, Spinner,
  Button, Input, Space, Container, ErrorText } from '../common';
import NavigationService from '../../services/NavigationService';


class SignupStep1 extends Component {
    onFirstNameChange(text) {
        this.props.signupUpdate({prop: 'firstName', value: text});
    }
    onLastNameChange(text) {
        this.props.signupUpdate({prop: 'lastName', value: text});
    }

    onUsernameChange(text) {
        this.props.signupUpdate({prop: 'username', value: text});
    }
    next() {
        const { firstName, lastName, username } = this.props;

        this.props.submitStep1({ firstName, lastName, username })
          .then(() => {
              if(this.props.step1IsValid){
                NavigationService.navigate('SignupStep2');
              }
          })
          .catch(() => {
            const step = 1;
            this.props.dispatchUncaughtError(step);
          });
    }
    renderNextButton(){
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={() => this.next()}>
                next
            </Button>
        );
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
            <Header includeBackButton />
            <Card>
              <CardSection>
                  <HeaderText3 headerText="What's your name?" />
              </CardSection>
              <CardSection>
                <Input
                    placeholder="first name"
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={this.onFirstNameChange.bind(this)}
                    value={this.props.firstName}
                />
              </CardSection>
              <CardSection>
                <Input
                    placeholder="last name"
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={this.onLastNameChange.bind(this)}
                    value={this.props.lastName}
                />
              </CardSection>
              <Space height={30} />
              <CardSection>
                  <HeaderText3 headerText="Choose a username." />
              </CardSection>
              <CardSection>
                <Input
                    placeholder="username"
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={this.onUsernameChange.bind(this)}
                    value={this.props.username}
                />
              </CardSection>
              <Space height={30} />
              <CardSection>
                {this.renderNextButton()}
              </CardSection>
              {this.renderError()}
            </Card>
          </Container>
        );
    }
}

const mapStateToProps = ({ signUp }) => {
    const { firstName, lastName, username, error, loading, step1IsValid } = signUp;
    return { firstName, lastName, username, error, loading, step1IsValid };
  };

  export default connect(mapStateToProps, {
    signupUpdate, submitStep1, dispatchUncaughtError
  })(SignupStep1);
