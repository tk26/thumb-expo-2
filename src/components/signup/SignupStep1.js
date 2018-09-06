import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { signupUpdate, submitStep1, dispatchUncaughtError } from '../../actions';

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

    render() {
        return (
            <View>
                <View>
                    <Text>
                        What's your name?
                    </Text>
                    <Text>
                        FIRST NAME
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={this.onFirstNameChange.bind(this)}
                    value={this.props.firstName}
                />
                <View>
                    <Text>
                        LAST NAME
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="words"
                    onChangeText={this.onLastNameChange.bind(this)}
                    value={this.props.lastName}
                />
                <View>
                    <Text>
                        Choose your username.
                    </Text>
                </View>
                <TextInput
                    maxLength={30}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={this.onUsernameChange.bind(this)}
                    value={this.props.username}
                />
                
                <Button title="NEXT" onPress={() => this.next()} />

                <View>
                    <Text>
                        {this.props.error}
                    </Text>
                </View>
            </View>
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