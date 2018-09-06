import React, { Component } from 'react';
import { View, Text, Button, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { signupUpdate, submitStep3, dispatchUncaughtError } from '../../actions'; 

class SignupStep3 extends Component {
    onEmailChange(email){
        this.props.signupUpdate({prop: 'email', value: email.toLowerCase()});
    }
    onBirthdayChange(birthday){
        this.props.signupUpdate({prop: 'birthday', value: birthday});
    }
    onUniversityChange(university){
        this.props.signupUpdate({prop: 'university', value: university});
    }
    next() {
        const {email, birthday, university} = this.props;
        this.props.submitStep3({email, birthday, university})
            .then(() => {
                if(this.props.step3IsValid){
                    this.props.navigation.navigate('SignupStep4');                  
                }
            })
            .catch(() => {
                const step = 3;
                this.props.dispatchUncaughtError(step);
            });
    }

    render() {
        return (
            <View>
                <Text>
                    And, your email? {'\n'}
                    Please use your '.edu' email address. {'\n'}
                </Text>
                <Text>
                    EMAIL
                </Text>
                <TextInput
                    maxLength={254}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                />
                <Text>
                    Don't have a '.edu' email address to sign up with? Click here.
                </Text>
                
                <Text>
                    What school do you attend?
                </Text>
                <Text>
                    UNIVERSITY
                </Text>
                <Picker
                    selectedValue={this.props.university}
                    onValueChange={this.onUniversityChange.bind(this)}>
                    <Picker.Item label="Select University" value="none" />
                    <Picker.Item label="Indiana University" value="indiana-university" />
                    <Picker.Item label="Purdue University" value="purdue-university" />
                    <Picker.Item label="Other" value="other" />
                </Picker>

                <Text>
                    What is your birthday?
                </Text>
                <Text>
                    Thumb uses your birthday to organize our users so we can learn more about how
                    each person is using the application. We want to make the best product and this will help us improve.
                </Text>
                <DatePicker
                    date={this.props.birthday}
                    mode="date"
                    placeholder="select birthday"
                    format="MM-DD-YYYY"
                    minDate={new Date(moment().subtract(25, 'y'))}
                    maxDate={new Date(moment().subtract(16, 'y'))}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={this.onBirthdayChange.bind(this)}
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
    const { email, birthday, university, error, loading, step3IsValid } = signUp;
    return { email, birthday, university, error, loading, step3IsValid };
};
  
export default connect(mapStateToProps, {
    signupUpdate, submitStep3, dispatchUncaughtError 
})(SignupStep3);