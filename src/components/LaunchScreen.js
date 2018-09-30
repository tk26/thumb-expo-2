import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Card, CardSection, HeaderText1, Link1, Logo, Button, Space, StandardText, WidthSpace } from '../components/common';

//TODO - Change to actual privacy policy and terms of service.
const privacyPolicyUrl = "https://thumbtravel.co/how-thumb-works.html";
const termsOfServiceUrl = "https://thumbtravel.co/how-thumb-works.html";

export default class LaunchScreen extends Component {
  render() {
      return (
        <Container>
          <Card>
            <Space height={50} />
            <CardSection>
              <Logo size="medium"/>
            </CardSection>
            <CardSection>
              <HeaderText1 headerText='Welcome to thumb' />
            </CardSection>
            <Space height={30} />
            <CardSection>
              <Button onPress={() => this.props.navigation.navigate('LoginScreen')}>
                log in
              </Button>
              <WidthSpace width={30} />
              <Button onPress={() => this.props.navigation.navigate('SignupStep1')}>
                create account
              </Button>
            </CardSection>
            <CardSection>
              <StandardText>
                By tapping "log in" or "create account", I agree
                to thumb's&nbsp;
                <Link1
                  linkText='terms of service'
                  onPress={() => Linking.openURL(privacyPolicyUrl)}
                />
                &nbsp;and&nbsp;
                <Link1
                    linkText='privacy policy'
                    onPress={() => Linking.openURL(termsOfServiceUrl)}
                />.
              </StandardText>
            </CardSection>
          </Card>
        </Container>
      );
  }
}
