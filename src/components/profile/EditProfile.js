import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { profileUpdate, submitPofileUpdate, submitPofilePictureUpdate, updateProfilePicture,
  dispatchProfileError } from '../../actions';
import { Container, Header, Card, CardSection, StandardText, Input,
  HeaderText3, Button, ErrorText, Spinner } from '../common';

class EditProfile extends Component {
  constructor(props) {
    super(props);
  }

  onBioChangeText(text){
    this.props.profileUpdate({prop: 'bio', value: text});
  }

  async submit(){
    try {
      let profilePicture;
      if (profilePicture !== this.props.currentProfilePicture){
        profilePicture = this.props.profilePicture;
        await this.props.submitPofilePictureUpdate(profilePicture);
      }
      await this.props.submitPofileUpdate(this.props.bio);
    } catch(error){
      console.log(error);
      this.props.dispatchProfileError(error);
    }
  }

  pickImage(){
    this.props.updateProfilePicture()
      .then(() => {})
      .catch((error) => {
        this.props.dispatchProfileError(error);
      });
  };

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

  renderButton(){
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={() => this.submit()}>
          update
      </Button>
    );
  }

    render() {

        const profilePicture = this.props.profilePicture ? this.props.profilePicture : '';
        return (
            <Container>
              <Header includeBackButton />
              <Card>
                <CardSection>
                  <StandardText>First Name: {this.props.firstName}</StandardText>
                </CardSection>
                <CardSection>
                  <TouchableOpacity onPress={this.pickImage.bind(this) }>
                      <Image
                          style={{width: 50, height: 50, resizeMode:"contain"}}
                          source={ profilePicture ?
                              { uri: profilePicture }
                              : require('../../../assets/thumb-horizontal-logo.png') }
                      />
                  </TouchableOpacity>
                </CardSection>
                <CardSection>
                  <StandardText>Username: @{this.props.username}</StandardText>
                </CardSection>
                <CardSection>
                  <StandardText>School: {this.props.school}</StandardText>
                </CardSection>
                <CardSection>
                  <StandardText>Bio:</StandardText>
                </CardSection>
                <CardSection>
                  <Input
                      maxLength={100}
                      autoCorrect={true}
                      onChangeText={this.onBioChangeText.bind(this)}
                      placeholder="Yo, add a bio"
                      value={this.props.bio}
                  />
                </CardSection>
                {this.renderError()}
                <CardSection>
                  {this.renderButton()}
                </CardSection>
              </Card>
            </Container>
        );
    }
}

const mapStateToProps = ({ profile }) => {
  console.log(profile);
  const { firstName, username, school } = profile;
  const currentProfilePicture = profile.profilePicture;
  const { profilePicture, bio, error, loading } = profile.editProfile;
  return { firstName, username, bio, school,
    profilePicture, error, loading, currentProfilePicture };
};

export default connect(mapStateToProps,
  { profileUpdate, submitPofileUpdate, submitPofilePictureUpdate, updateProfilePicture,  dispatchProfileError }
)(EditProfile);
