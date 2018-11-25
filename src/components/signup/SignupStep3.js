import React, { Component } from 'react';
import { Picker, View, TouchableOpacity, Text, Modal, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { signupUpdate, submitStep3, dispatchUncaughtError } from '../../actions';
import { Container, Card, CardSection, ErrorText, HeaderText3,
  StandardText, Spinner, Button, Input, Header, DateSelector, Space, AutoCompleteInput } from '../common';
import {StaticDataService, NavigationService } from '../../services';

const initialState = {
  dataLoading: true,
  universities: [],
  searchUniversity: false
}

class SignupStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount(){
    try{
      const universities = await StaticDataService.getSupportedUniversities();
      this.setState({universities, dataLoading: false});
    } catch(error){
      this.setState({dataLoading: false});
      this.props.dispatchUncaughtError(3);
    }
  }
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
                NavigationService.navigate('SignupStep4');
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

  renderUniversityPicker(){
    if (!this.state.searchUniversity){
      return null;
    }
    return (
      <AutoCompleteInput
        placeholder="search university"
        filterProperty="officialName"
        itemCollection={this.state.universities}
        showSearch={true}
        onSelectItem={(university) => {
          this.onUniversityChange(university);
          this.setState({searchUniversity: false});
        }}
      />
    )
  }

  render() {
    if(this.state.dataLoading){
      return (
        <Container>
          <Header includeBackButton />
          <Spinner size="large" />
        </Container>
      )
    }
    return (
        <Container>
          <Header includeBackButton />
          <Card>
            <CardSection>
              <HeaderText3 headerText="What school do you attend?" />
            </CardSection>
            <CardSection>
              <Button
                onPress={() => this.setState({searchUniversity: true})}
              >
                {this.props.university}
              </Button>
              <Button
                onPress={() => this.setState({searchUniversity: false})}
              >
                X
              </Button>
            </CardSection>
            {this.renderUniversityPicker()}
            <Space height={30} />
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
