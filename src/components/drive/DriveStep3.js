import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { getApiUrl } from '../../helper';
import { NavigationActions, StackActions } from 'react-navigation';

export default class DriveStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.state.error = '';
        this.state.travelDescription = '';
        this.state.driveId = '';
    }
    
    submitDrive() {
        if (this.state.travelDescription === '') {
            this.setState({ error: "Please add a travel description" });
            return;
        }

        this.state.drive.travelDescription = this.state.travelDescription;
        let responseStatus = 0;
        fetch(getApiUrl() + '/drive/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "startLocation": this.state.drive.startLocation,
                "endLocation": this.state.drive.endLocation,
                "availableSeats": this.state.drive.availableSeats,
                "travelDate": this.state.drive.travelDate,
                "travelTime": this.state.drive.travelTime,
                "travelDescription": this.state.drive.travelDescription
            })
        })
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(response => {
                if (responseStatus == 400) {
                    this.setState({
                        error: "Missing one or more drive details"
                    })
                }
                else if (responseStatus == 200) {
                    // TODO save user drives in local storage with a key
                    this.setState({ driveId: response.drive.driveId });
                    this.getRideResults();
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
            });
    }

    getRideResults() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/ride/tripmatches?' +
            'startPoint={"latitude":' + this.state.drive.startLocation.latitude +
            ', "longitude":' + this.state.drive.startLocation.longitude +
            '}&endPoint={"latitude":' + this.state.drive.endLocation.latitude +
            ', "longitude":' + this.state.drive.endLocation.longitude +
            '}&travelDate=' + this.state.drive.travelDate, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            }
        })
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(response => {
                console.log(JSON.stringify(response));
                if (responseStatus === 200 && response.length > 0) {
                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Travel'}),
                            NavigationActions.navigate({ 
                                routeName: 'DriveResults',
                                params: {
                                    drive: this.state.drive,
                                    rideResults: response,
                                    driveId: this.state.driveId,
                                }
                            })
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    this.sendToZeroResultsPage();                    
                }
            })
            .catch(error => {
                // TODO log error
                this.sendToZeroResultsPage();
            });
    }

    sendToZeroResultsPage() {
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Travel'}),
                NavigationActions.navigate({ 
                    routeName: 'DriveStep4',
                    params: {
                        drive: this.state.drive,
                        driveId: this.state.driveId,
                    }
                })
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const drive = this.props.navigation.state.params.drive;
        return (
            <View>
                <View>
                    <Text>
                        {drive.startLocation.address}
                        {'\n'}
                        {drive.endLocation.address}
                        {'\n'}
                        Seats available: {drive.availableSeats}
                        {'\n'}
                        {drive.travelDate}
                        {'\n'}
                        {drive.travelTime[0]}:00 to {drive.travelTime[1]}:00
                    </Text>
                </View>
            
                <Image
                    source={require('../../../assets/thumb-horizontal-logo.png')}
                />

                <TextInput
                    maxLength={100}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="describe your travel"
                    onChangeText={(travelDescription) => this.setState({ travelDescription })}
                    value={this.state.travelDescription}
                />

                <Button title="Invite Riders" onPress={() => { }} />

                <View>
                    <Text>
                        Share
                    </Text>
                    <Text>
                        Our platform is growing and when you share your trip request to Facebook and Twitter, our data shows
                        that you are 3 times more likely to get a match. Click below to share your travel on other accounts.
                    </Text>
                    <Text>
                        Facebook
                    </Text>
                    <Text>
                        Twitter
                    </Text>
                </View>
            
                <Button title="NEXT" onPress={() => { this.submitDrive(); }} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}