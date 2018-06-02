import React, { Component } from 'react';
import { View, Text, Button, Picker, Alert, TouchableHighlight } from 'react-native';

const initialState = {
    timeRequested: 'none', isInvited: false, error: ''
};

export default class InviteDriver extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    getEarliestTravelTime(left, right) {
        return left >= right ? left : right;
    }

    getLatestTravelTime(left, right) {
        return left <= right ? left : right;
    }

    getOptions(driveTimesArray, rideTimesArray) {
        let earliest = this.getEarliestTravelTime(parseInt(driveTimesArray[0]), parseInt(rideTimesArray[0]));
        let latest = this.getLatestTravelTime(parseInt(driveTimesArray[1]), parseInt(rideTimesArray[1]));
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
        // TODO call API, also attach it to the results as "Request sent"
        Alert.alert('Request sent', '');
        this.setState({ isInvited: true });
    }

    render() {
        const drive = this.props.navigation.state.params.drive;
        const ride = this.props.navigation.state.params.ride;
        
        return (
            <View>
                <Text>
                    Ride request to {drive.userFirstName}
                    {'\n'}
                    {/* Profile Picture: {drive.userProfilePicture} */}
                    {'\n'}
                </Text>
                <TouchableHighlight
                    onPress={() => {
                        drive.userName === global.username ? this.props.navigation.navigate('Profile')
                            : this.props.navigation.navigate('PublicProfile', { username: drive.userName });
                    }}
                >
                    <Text>
                        @{drive.userName}
                        {'\n'}
                    </Text>
                </TouchableHighlight>
                <Text>
                    {drive.travelDescription}
                    {'\n'}
                    {drive.travelTime}
                    {'\n'}
                </Text>

                <Text>Choose time to send</Text>

                <Picker
                    selectedValue={this.state.timeRequested}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Select travel time" value="none" />
                    { 
                        this.getOptions(drive.travelTime.split(','), ride.travelTime)
                            .map((item, index) => {
                                return (< Picker.Item label={item + ":00"} value={item} key={index} />);
                            })
                    }
                </Picker>
                
                <Text> 
                    $31 {'\n'}
                    When you press Request, we'll send a notification to the driver 
                    that you've invited them to join your trip. Then when they accept,
                    we'll notify you and you'll be set! Also, the price of your travel 
                    has been calculated by us to include mileage and gas expenses,
                    that way no one has to negotiate and get an unfair price.
                </Text>
                
                <Button 
                    title={ this.state.isInvited ? "Request sent" : "Request" }
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