import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { getApiUrl } from '../../helper';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { feedbackUpdate, submitFeedback } from '../../actions';

class ReportBug extends Component {
    onBugChange(text) {
        this.props.feedbackUpdate({prop: 'feedbackDescription', value: text});
    }
    
    submitBugReport() {
        this.props.submitFeedback({
            feedbackType: 'bug',
            feedbackDescription: this.props.feedbackDescription 
        })
        .then(() => {
            if(this.props.isValid) {
                // go back to Feedback Screen and show the message there
                this.props.navigation.state.params.showFeedbackSubmitMessage("Feedback submitted successfully");
                const backAction = NavigationActions.back({
                    key: null
                });
                this.props.navigation.dispatch(backAction);
            }
        })
        .catch(() => {});
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />
                <Text>Tell us about the bug you're experiencing...{'\n'}</Text>

                <Text>
                    We want to hear what you love and what you think we can do better.
                    We also want to integrate your suggestions to make our product better in the future.
                    At thumb, we promise to respond to every piece of feedback individually.
                    {'\n'}
                </Text>
                
                <Text>YOUR EXPERIENCE</Text>
                

                <TextInput
                    maxLength={400}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="The home feed has a different time zone."
                    onChangeText={this.onBugChange.bind(this)}
                    value={this.props.feedbackDescription}
                />

                <Button title="SUBMIT" onPress={() => this.submitBugReport()} />

                <Text>{this.props.error}</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ feedback }) => {
    const { feedbackDescription, isValid, error } = feedback;
    return { feedbackDescription, isValid, error };
};
  
export default connect(mapStateToProps, {
    feedbackUpdate, submitFeedback
})(ReportBug);