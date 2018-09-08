import React, { Component } from 'react';
import { View, Text, Button, Picker, Alert, TouchableHighlight } from 'react-native';
import { getApiUrl } from '../../helper';

const initialState = {
    timeRequested: 'none', isInvited: false, error: ''
};

export default class InviteRider extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.state.driveId = this.props.navigation.state.params.driveId;
    }

    getEarliestTravelTime(left, right) {
        return left >= right ? left : right;
    }

    getLatestTravelTime(left, right) {
        return left <= right ? left : right;
    }

    getOptions(rideTimesArray, driveTimesArray) {
        let earliest = this.getEarliestTravelTime(parseInt(rideTimesArray[0]), parseInt(driveTimesArray[0]));
        let latest = this.getLatestTravelTime(parseInt(rideTimesArray[1]), parseInt(driveTimesArray[1]));
        let options = [];
        for (let i = earliest; i <= latest; i++) {
            options.push(i);
        }
        return options;
    }

    onValueChange(timeRequested) {
        this.setState({ timeRequested, error: '' });
    }

    sendInvite() {
        if (this.state.timeRequested === 'none') {
            this.setState({ error: "Please select a time" });
            return;
        }

        let responseStatus = 0;
        fetch(getApiUrl() + '/drive/inviterider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + global.auth_token
            },
            body: JSON.stringify({
                "toUserId": this.props.navigation.state.params.ride.userId,
                "rideId": this.props.navigation.state.params.ride.rideId,
                "driveId": this.props.navigation.state.params.driveId,
                "requestedTimes": this.state.timeRequested.toString().split(","),
                "comment": this.props.navigation.state.params.drive.travelDescription || "",
            })
        })
        .then(response => {
            responseStatus = response.status;
            return response.json()
        })
        .then(response => {
            if (responseStatus == 400) {
                this.setState({
                    error: "Missing one or more invitation details"
                })
            }
            else if (responseStatus == 200) {
                Alert.alert('Invite sent', '');
                this.setState({ isInvited: true });
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

    render() {
        const ride = this.props.navigation.state.params.ride;
        const drive = this.props.navigation.state.params.drive;
        
        return (
            <View>
                <Text>
                    Invite {ride.userFirstName}
                    {'\n'}
                    {/* Profile Picture: {ride.userProfilePicture} */}
                    {'\n'}
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        ride.userName === global.username ? this.props.navigation.navigate('Profile')
                            : this.props.navigation.navigate('PublicProfile', { username: ride.userName });
                    }}
                >
                    <Text>
                        @{ride.userName}
                        {'\n'}
                    </Text>
                </TouchableHighlight>
                <Text>
                    {ride.travelDescription}
                    {'\n'}
                    {ride.pickupNotes}
                    {'\n'}
                    {ride.travelTime}
                    {'\n'}
                </Text>

                <Text>Choose time to send</Text>

                <Picker
                    selectedValue={this.state.timeRequested}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Select travel time" value="none" />
                    { 
                        this.getOptions(ride.travelTime.split(','), drive.travelTime)
                            .map((item, index) => {
                                return (< Picker.Item label={item + ":00"} value={item} key={index} />);
                            })
                    }
                </Picker>
                
                <Text> 
                    $31 {'\n'}
                    When you press Invite, we'll send a notification to the rider 
                    that you've invited them to join your trip. Then when they accept,
                    we'll notify you and you'll be set! Also, the price of your travel 
                    has been calculated by us to include mileage and gas expenses,
                    that way no one has to negotiate and get an unfair price.
                </Text>
                
                <Button 
                    title={ this.state.isInvited ? "Invite sent" : "Invite" }
                    disabled = {this.state.isInvited}
                    onPress={() => { this.sendInvite(); }}
                />

                <Text>
                    {this.state.error}
                </Text>
            </View>
        );
    }
}