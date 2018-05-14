import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { NavigationActions, StackActions } from 'react-navigation';

export default class DriveStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.state.error = '';
        this.state.travelDescription = '';
    }
    
    submitDrive() {
        if (this.state.travelDescription === '') {
            this.setState({ error: "Please add a travel description" });
            return;
        }

        this.state.drive.travelDescription = this.state.travelDescription;
        let responseStatus = 0;
        // fetch(API_URL + '/drive/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer' + ' ' + global.auth_token
        //     },
        //     body: JSON.stringify({
        //         "startLocation": this.state.drive.startLocation,
        //         "endLocation": this.state.drive.endLocation,
        //         "availableSeats": this.state.drive.availableSeats,
        //         "travelDate": this.state.drive.travelDate,
        //         "travelTime": this.state.drive.travelTime,
        //         "travelDescription": this.state.drive.travelDescription
        //     })
        // })
        //     .then(response => {
        //         responseStatus = response.status;
        //         return response.json()
        //     })
        //     .then(response => {
        //         if (responseStatus == 400) {
        //             this.setState({
        //                 error: "Missing one or more drive details"
        //             })
        //         }
        //         else if (responseStatus == 200) {
        //             // Get ride results
        //             // then determine whether to show Zero results page or Results page
        //             // written below
        //         }
        //         else {
        //             this.setState({
        //                 error: "Some error occured. Please try again. If problem persists, " +
        //                     "please let us know at support@thumbtravel.com"
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         // TODO log error
        //         this.setState({
        //             error: "Some error occured. Please try again. If problem persists, " +
        //                 "please let us know at support@thumbtravel.com"
        //         })
        //     })

        // mock data
        let rideResults = [
            {
                // Ride info
                rideId: 1,
                rideDate: '05/31/2018',
                rideTimes: [2, 8],
                ridePickupNotes: 'Get through the lane',
                rideTravelDescription: 'For my cousin\'s grad ceremony',
                // Rider Info
                riderFirstName: 'John',
                riderUsername: 'john_cena',
                riderProfilePicture: 'john.jpg',
            },
            {
                // Ride info
                rideId: 2,
                rideDate: '06/15/2018',
                rideTimes: [1, 9],
                ridePickupNotes: 'Do not go through the lane',
                rideTravelDescription: 'For my grad ceremony',
                // Rider Info
                riderFirstName: 'Jane',
                riderUsername: 'just_jane',
                riderProfilePicture: 'jane.jpg',
            }
        ];       
        if (rideResults.length === 0) {
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Travel'}),
                    NavigationActions.navigate({ 
                        routeName: 'DriveStep4',
                        params: {
                            drive: this.state.drive
                        }
                    })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Travel'}),
                    NavigationActions.navigate({ 
                        routeName: 'DriveResults',
                        params: {
                            drive: this.state.drive,
                            rideResults: rideResults
                        }
                    })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        }
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
                    source={require('./../../assets/thumb-horizontal-logo.png')}
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