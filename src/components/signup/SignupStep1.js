import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { signupUpdate, submitStep1, dispatchUncaughtError } from '../../actions';
import { Card, CardSection, Spinner, Button, Input } from '../common';

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
                this.props.navigation.navigate('SignupStep2', {
                    user: {
                        firstName: this.props.firstName,
                        lastName: this.props.lastName,
                        username: this.props.username
                    }
                });                  
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
                NEXT
            </Button>
        );
    }
    renderError(){
        if(this.props.error !== ''){
            return (
                <CardSection>
                    <Text>
                        {this.props.error}
                    </Text>
                </CardSection>
            );
        }
        return null;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Text>
                        What's your name?
                    </Text>
                </CardSection>
                <CardSection>                
                    <Input
                        label='First Name:'
                        maxLength={30}
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={this.onFirstNameChange.bind(this)}
                        value={this.props.firstName}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Last Name:"
                        maxLength={30}
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={this.onLastNameChange.bind(this)}
                        value={this.props.lastName}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Username:"
                        maxLength={30}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={this.onUsernameChange.bind(this)}
                        value={this.props.username}
                    /> 
                </CardSection>
                <CardSection>               
                    {this.renderNextButton()}
                </CardSection>
                {this.renderError()}
            </Card>
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