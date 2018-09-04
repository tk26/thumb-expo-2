import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { signupUpdate, submitStep2 } from '../../actions';

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

    render() {
        return (
            <View>
                <View>
                    <Text>
                        Create a password. {'\n'}
                        Your password must be: {'\n'}
                        - At least 8 characters {'\n'}
                        - Use a combination of upper and lowercase letters {'\n'}
                        - Use at least one special character {'\n'}
                        - Use at least one number {'\n'}
                    </Text>
                </View>

                <View>
                    <Text>
                        PASSWORD
                    </Text>
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                />

                <View>
                    <Text>
                        CONFIRM PASSWORD
                    </Text>
                </View>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={this.onConfirmPasswordChange.bind(this)}
                    value={this.props.confirmPassword}
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
    const { password, confirmPassword, error, loading, step2IsValid } = signUp;
    return { password, confirmPassword, error, loading, step2IsValid };
  };
  
  export default connect(mapStateToProps, {
    signupUpdate, submitStep2 
  })(SignupStep2);