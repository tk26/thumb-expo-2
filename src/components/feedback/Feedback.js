import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

const initialState = { feedbackSubmitMessage: '' }

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    showFeedbackSubmitMessage(message){
        this.setState({ feedbackSubmitMessage: message });
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />

                <Text>{ this.state.feedbackSubmitMessage } {'\n'}</Text>
                
                <Text>how are we doing?{'\n'}</Text>
                
                <Text>
                    We want to hear what you love and what you think we can do better.
                    We also want to integrate your suggestions to make our product better in the future.
                    At thumb, we promise to respond to every piece of feedback individually.
                    {'\n'}
                </Text>

                
                <Text>
                    If you have a question or need help resolving an issue quickly, please email
                    info@thumbtravel.com, or visit our FAQ's page. We will get back to you as soon as possible.
                    {'\n'}
                </Text>
        

            
                <Text>
                    WHAT WOULD YOU LIKE TO DO?
                    {'\n'}
                </Text>

                    <Button title="Report a bug" style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('ReportBug', { 
                                showFeedbackSubmitMessage: this.showFeedbackSubmitMessage 
                            }) }
                    />

                    <Button title="Ask a question" rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('AskQuestion', { 
                                showFeedbackSubmitMessage: this.showFeedbackSubmitMessage 
                            }) }
                    />

                    <Button title="Request a feature" style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('RequestFeature', { 
                                showFeedbackSubmitMessage: this.showFeedbackSubmitMessage 
                            }) }
                    />

                    <Button title="Other" rounded info style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('OtherFeedback', { 
                                showFeedbackSubmitMessage: this.showFeedbackSubmitMessage 
                            }) }
                    />
            </View>
        );
    }
}