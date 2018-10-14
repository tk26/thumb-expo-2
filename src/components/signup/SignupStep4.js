import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { createUser, dispatchUncaughtError } from '../../actions';
import { Card, CardSection, Container, Button, Header,
  StandardText, Spinner, Link1, HeaderText3, ErrorText } from '../common';
import NavigationService from '../../services/NavigationService';

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
                const step = 4;
                this.props.dispatchUncaughtError(step);
            })
    }
    renderSubmitButton(){
        if(this.props.loading){
            return <Spinner />
        }
        return (
          <Button onPress={() => this.submitUser()}>
            continue
          </Button>
        )
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
                  <HeaderText3 headerText="Before you join"/>
                </CardSection>
                <CardSection>
                  <StandardText>
                      Please commit to respecting everyone in the thumb community.  <Link1
                        onPress={() => Linking.openURL('https://www.google.com')}
                        linkText="Learn More"
                      />
                  </StandardText>
                </CardSection>
                <CardSection>
                  <StandardText>
                      By clicking "Continue", I agree to treat everyone in the thumb community -
                      regardless of their race, religion, national origin, ethnicity, disability, gender identity,
                      sexual orientation or age - with respect, and without judgement or bias.
                  </StandardText>
                </CardSection>
                <CardSection>
                  {this.renderSubmitButton()}
                </CardSection>
                {this.renderError()}
              </Card>
            </Container>
        );
    }
}

const mapStateToProps = ({ signUp }) => {
    const { firstName, lastName, username, password, email, birthday, university, error, loading, step4IsValid } = signUp;
    return { firstName, lastName, username, password, email, birthday, university, error, loading, step4IsValid };
};

export default connect(mapStateToProps, {
    createUser, dispatchUncaughtError
})(SignupStep4);
