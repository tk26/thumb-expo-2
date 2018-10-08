import React, { Component } from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { signupUpdate, submitStep3, dispatchUncaughtError } from '../../actions';
import { Container, BackButton, Card, CardSection, ErrorText, HeaderText3,
  StandardText, Spinner, Button, Input, Header, DateSelector, Space } from '../common';
import NavigationService from '../../services/NavigationService';

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
    renderNextButton(){
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        return (
            <Button onPress={() => this.next()}>next</Button>
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
              <Header>
                <BackButton onPress={NavigationService.goBack} />
              </Header>
              <Card>
                <CardSection>
                  <HeaderText3 headerText="What is your email?" />
                </CardSection>
                <CardSection>
                  <Input
                      placeholder="email@university.edu"
                      maxLength={254}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={this.onEmailChange.bind(this)}
                      value={this.props.email}
                  />
                </CardSection>
                <Space height={30} />
                <CardSection>
                  <HeaderText3 headerText="What school do you attend?" />
                </CardSection>
                <Picker
                    mode="dialog"
                    selectedValue={this.props.university}
                    onValueChange={this.onUniversityChange.bind(this)}>
                    <Picker.Item label="Select University" value="none" />
                    <Picker.Item label="Indiana University" value="indiana-university" />
                    <Picker.Item label="Purdue University" value="purdue-university" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                <CardSection>
                  <HeaderText3 headerText="What is your birthday?" />
                </CardSection>
                <CardSection>
                  <StandardText>
                      Thumb uses your birthday to organize our users so we can learn more about how
                      each person is using the application. We want to make the best product and this will help us improve.
                  </StandardText>
                </CardSection>
                <CardSection>
                  <DateSelector
                      date={this.props.birthday}
                      placeholder="select birthday"
                      minDate={new Date(moment().subtract(25, 'y'))}
                      maxDate={new Date(moment().subtract(16, 'y'))}
                      onDateChange={this.onBirthdayChange.bind(this)}
                  />
                </CardSection>
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
    const { email, birthday, university, error, loading, step3IsValid } = signUp;
    return { email, birthday, university, error, loading, step3IsValid };
};

export default connect(mapStateToProps, {
    signupUpdate, submitStep3, dispatchUncaughtError
})(SignupStep3);
