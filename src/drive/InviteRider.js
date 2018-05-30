import React, { Component } from 'react';
import { View, Text, Button, Picker, Alert } from 'react-native';

const initialState = {
    timeRequested: 'none', isInvited: false, error: ''
};

export default class InviteRider extends Component {
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
        // TODO call API, also attach it to the results as "Invite sent"
        Alert.alert('Invite sent', '');
        this.setState({ isInvited: true });
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
                    @ {ride.userName}
                    {'\n'}
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