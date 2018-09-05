import React, { Component } from 'react';
import { View, Text, Button, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { createUser } from '../../actions'; 

class SignupStep4 extends Component {
    submitUser() {
        const {firstName, lastName, username, password, email, birthday, university} = this.props;
        this.props.createUser({firstName, lastName, username, password, email, birthday, university})
            .then(() => {
                if(this.props.step4IsValid){
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'SignupSuccess' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            })
            .catch(() => {

            })
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />
                <View>
                    <Text>
                        Before you join
                    </Text>
                </View>

                <View>
                    <Text>
                        Please commit to respecting everyone in the thumb community
                        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://www.google.com')}>
                            Learn More
                        </Text>
                    </Text>
                </View>

                <View>
                    <Text>
                        By clicking "Continue", I agree to treat everyone in the thumb community -
                        regardless of their race, religion, national origin, ethnicity, disability, gender identity,
                        sexual orientation or age - with respect, and without judgement or bias.
                    </Text>
                </View>

                <Button title="CONTINUE" onPress={() => this.submitUser()} />

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
    const { firstName, lastName, username, password, email, birthday, university, error, loading, step4IsValid } = signUp;
    return { firstName, lastName, username, password, email, birthday, university, error, loading, step4IsValid };
};
  
export default connect(mapStateToProps, {
    createUser
})(SignupStep4);