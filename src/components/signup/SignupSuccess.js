import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Container, Card, CardSection, Button, HeaderText3,
  StandardText, Space, Logo } from '../common';
import NavigationService from '../../services/NavigationService';

export default class SignupSuccess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container>
            <Space height={60} />
            <Card>
              <CardSection>
                <Logo size="medium"/>
              </CardSection>
              <CardSection>
                <HeaderText3 headerText="Welcome to thumb!"/>
              </CardSection>
              <CardSection>
                <StandardText>
                    We have just sent you a confirmation email. Please check your inbox. If you did not receive
                    our confirmation email, please let us know by emailing thumb support support@thumbtravel.com.
                </StandardText>
              </CardSection>
              <CardSection>
                <Button
                  onPress={() => NavigationService.navigate('LoginScreen')}
                >
                  login
                </Button>
              </CardSection>
            </Card>
          </Container>
        );
    }
}
