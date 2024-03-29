import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { getApiUrl } from '../../helper';
import { NavigationActions, StackActions } from 'react-navigation';

export default class RideStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.state.error = '';
        this.state.travelDescription = '';
        this.state.rideId = '';
    }

    submitRide() {
        if (this.state.travelDescription === '') {
            this.setState({ error: "Please add a travel description" });
            return;
        }
        
        this.state.ride.travelDescription = this.state.travelDescription;
        let responseStatus = 0;
        fetch(getApiUrl() + '/ride/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "startLocation": this.state.ride.startLocation,
                "endLocation": this.state.ride.endLocation,
                "pickupNotes": this.state.ride.pickupNotes,
                "travelDate": this.state.ride.travelDate,
                "travelTime": this.state.ride.travelTime,
                "travelDescription": this.state.ride.travelDescription
            })
        })
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(response => {
                if (responseStatus == 400) {
                    this.setState({
                        error: "Missing one or more ride details"
                    })
                }
                else if (responseStatus == 200) {
                    // TODO save user rides in local storage with a key
                    this.setState({ rideId: response.ride.rideId });
                    this.getDriveResults();
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

    getDriveResults() {
        let responseStatus = 0;
        fetch(getApiUrl() + '/drive/tripmatches?' +
            'startPoint={"latitude":' + this.state.ride.startLocation.latitude +
            ', "longitude":' + this.state.ride.startLocation.longitude +
            '}&endPoint={"latitude":' + this.state.ride.endLocation.latitude +
            ', "longitude":' + this.state.ride.endLocation.longitude +
            '}&travelDate=' + this.state.ride.travelDate, {
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
                                routeName: 'RideResults',
                                params: {
                                    ride: this.state.ride,
                                    driveResults: response,
                                    rideId: this.state.rideId,
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
                    routeName: 'RideStep4',
                    params: {
                        ride: this.state.ride,
                        rideId: this.state.rideId,
                    }
                })
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const ride = this.props.navigation.state.params.ride;
        return (
            <View>
                <View>
                    <Text>
                        {ride.startLocation.address}
                        {'\n'}
                        {ride.endLocation.address}
                        {'\n'}
                        {ride.travelDate}
                        {'\n'}
                        {ride.travelTime[0]}:00 to {ride.travelTime[1]}:00
                        {'\n'}
                        {ride.pickupNotes}
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

                <Button title="Invite Driver" onPress={() => { }} />

                <View>
                    <Text>
                        Sharing options
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
                
                <Button title="NEXT" onPress={() => { this.submitRide(); }} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}