import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { profileUpdate, submitPofileUpdate } from '../../actions';

import { getApiUrl } from '../../helper';
import { ImagePicker, Permissions } from 'expo';

import { Container, Header, Card, CardSection, StandardText, Input,
  HeaderText3, Button, ErrorText, Spinner } from '../common';

const headerPhotoMap = {
    // TODO point to header photo sources
    "indiana-university": ""
}

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    onBioChangeText(text){
      this.props.profileUpdate({prop: 'bio', value: text});
    }

    submit(){
      this.props.submitPofileUpdate(this.props.profilePicture,
        this.props.bio)
        .then(() => {
        })
        .catch(() => {
        });
    }

    async _checkPermissions(){
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        this.setState({ status });

        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ cameraRollPermission: cameraRollPermission.status });
    };

    async _pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
            quality: 0
        });

        if (!result.cancelled) {
          this.props.profileUpdate({prop: 'profilePicture', value: result.base64});
        }
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
              <Header />
              <Card>
                <CardSection>
                  <StandardText>First Name: {this.props.firstName}</StandardText>
                </CardSection>
                <CardSection>
                  <TouchableOpacity onPress={this._pickImage }>
                      <Image
                          style={{width: 50, height: 50}}
                          source={ profilePicture.length > 0 ?
                              { uri: 'data:image/jpeg;base64,' + profilePicture }
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
                <ErrorText>{ this.props.error }</ErrorText>
              </Card>
            </Container>
        );
    }
}

const mapStateToProps = ({ profile }) => {
  console.log(profile.editProfile);
  const { firstName, username, school } = profile;
  const { profilePicture, bio, error, loading } = profile.editProfile;
  return { firstName, username, bio, school, profilePicture, error };
};

export default connect(mapStateToProps, { profileUpdate, submitPofileUpdate })(EditProfile);
