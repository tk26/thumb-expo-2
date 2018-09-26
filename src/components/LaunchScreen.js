import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Card, CardSection, HeaderText1, Link1, Logo, Button, StandardText } from '../components/common';

//TODO - Change to actual privacy policy and terms of service.
const privacyPolicyUrl = "https://thumbtravel.co/how-thumb-works.html";
const termsOfServiceUrl = "https://thumbtravel.co/how-thumb-works.html";

export default class LaunchScreen extends Component {
  render() {
      return (
        <Container>
          <Card>
            <CardSection>
              <Logo size="small"/>
            </CardSection>
            <CardSection>
              <HeaderText1 headerText='Welcome to thumb' />
            </CardSection>
            <CardSection>
              <Button onPress={() => this.props.navigation.navigate('LoginScreen')}>
                log in
              </Button>
              <Button onPress={() => this.props.navigation.navigate('SignupStep1')}>
                create account
              </Button>
            </CardSection>
            <CardSection>
              <StandardText>
                By tapping "log in" or "create account", I agree
                to thumb's <Link1 onPress={() => Linking.openURL(privacyPolicyUrl)}>
                TERMS OF SERVICE
                </Link1> and <Link1 onPress={() => Linking.openURL(termsOfServiceUrl)}>
                PRIVACY POLICY
                </Link1>.
              </StandardText>
            </CardSection>
          </Card>
        </Container>
      );
  }
}
