import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { getApiUrl } from '.././helper';
import { NavigationActions } from 'react-navigation';

const initialState = {
    question: '', error: ''
};

export default class AskQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    submitQuestion() {
        if (this.state.question.length < 1) {
            this.setState({ error: "Question cannot be empty" });
            return;
        }

        let responseStatus = 0;
        fetch(getApiUrl() + '/feedback/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "feedbackType": "question",
                "feedbackDescription": this.state.question
            })
        })
            .then(response => {
                responseStatus = response.status
                return response.json()
            })
            .then(response => {
                if (responseStatus == 400) {
                    this.setState({
                        error: "Invalid user details"
                    })
                }
                else if (responseStatus == 200) {
                    // go back to Feedback Screen and show the message there
                    this.props.navigation.state.params.showFeedbackSubmitMessage(response.message);
                    const backAction = NavigationActions.back({
                        key: null
                    });
                    this.props.navigation.dispatch(backAction);
                }
                else {
                    this.setState({
                        error: "Some error occured. Please try again. If problem persists, " +
                            "please let us know at support@thumbtravel.com"
                    })
                }
            })
            .catch(error => {
                // TODO log error
                this.setState({
                    error: "Some error occured. Please try again. If problem persists, " +
                        "please let us know at support@thumbtravel.com"
                })
            })
    }

    render() {
        return (
            <View>
                <Image
                    source={require('./../../assets/thumb-horizontal-logo.png')}
                />
                <Text>what question do you have...{'\n'}</Text>

                <Text>
                    We want to hear what you love and what you think we can do better.
                    We also want to integrate your suggestions to make our product better in the future.
                    At thumb, we promise to respond to every piece of feedback individually.
                    {'\n'}
                </Text>

                <Text>YOUR QUESTION</Text>

                <TextInput
                    maxLength={400}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Where can I see my upcoming trips?"
                    onChangeText={(question) => this.setState({ question, error: '' })}
                    value={this.state.question}
                />

                <Button title="SUBMIT" onPress={() => this.submitQuestion()} />

                <Text>{this.state.error}</Text>
            </View>
        );
    }
}