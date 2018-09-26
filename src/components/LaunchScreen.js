import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { Container, Card, CardSection, HeaderText1, Link1, Logo, Button, StandardText } from '../components/common';

export default class LaunchScreen extends Component {
  async openTermsOfService(){
    await Linking.openURL("www.google.com");
  }
  async openPrivacyPolicy(){
    await Linking.openURL("www.google.com");
  }
  render() {
      return (
          <Container>
            <Card>
              <CardSection>
                <Logo size="medium"/>
              </CardSection>
              <CardSection>
                <HeaderText1 headerText='Welcome to thumb' />
              </CardSection>
              <CardSection style={styles.buttonContainer}>
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
                  to thumb's <Link1 onPress={() => Linking.openURL('https://www.google.com')}>
                  TERMS OF SERVICE
                  </Link1> and <Link1 onPress={() => Linking.openURL('https://www.google.com')}>
                  PRIVACY POLICY
                  </Link1>.
                </StandardText>
              </CardSection>
            </Card>
          </Container>
      );
  }
}

const styles = {
  buttonContainer: {
  }
}
