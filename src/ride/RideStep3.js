import React, { Component } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { NavigationActions, StackActions } from 'react-navigation';

export default class RideStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.state.error = '';
        this.state.travelDescription = '';
    }

    submitRide() {
        if (this.state.travelDescription === '') {
            this.setState({ error: "Please add a travel description" });
            return;
        }
        
        this.state.ride.travelDescription = this.state.travelDescription;
        let responseStatus = 0;
        // fetch(API_URL + '/ride/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer' + ' ' + global.auth_token
        //     },
        //     body: JSON.stringify({
        //         "startLocation": this.state.ride.startLocation,
        //         "endLocation": this.state.ride.endLocation,
        //         "pickupNotes": this.state.ride.pickupNotes,
        //         "travelDate": this.state.ride.travelDate,
        //         "travelTime": this.state.ride.travelTime,
        //         "travelDescription": this.state.ride.travelDescription
        //     })
        // })
            // .then(response => {
            //     responseStatus = response.status;
            //     return response.json()
            // })
            // .then(response => {
            //     if (responseStatus == 400) {
            //         this.setState({
            //             error: "Missing one or more ride details"
            //         })
            //     }
            //     else if (responseStatus == 200) {
            //          //  Get drive results
            //          //  then determine whether to show ZeroResults page or ResultsPage
            //          //  written below
            //     }
            //     else {
            //         this.setState({
            //             error: "Some error occured. Please try again. If problem persists, " +
            //                 "please let us know at support@thumbtravel.com"
            //         })
            //     }
            // })
            // .catch(error => {
            //     // TODO log error
            //     this.setState({
            //         error: "Some error occured. Please try again. If problem persists, " +
            //             "please let us know at support@thumbtravel.com"
            //     })
            // })

            // mock data
            let driveResults = [
                {
                    // Drive info
                    driveId: 1,
                    driveDate: '05/31/2018',
                    driveTimes: [2, 8],
                    drivePrice: '30 $',
                    driveTravelDescription: 'For my cousin\'s wedding',
                    // Driver Info
                    driverFirstName: 'John',
                    driverUsername: 'john_cena',
                    driverProfilePicture: 'john.jpg',
                },
                {
                    // Drive info
                    driveId: 2,
                    driveDate: '06/15/2018',
                    driveTimes: [1, 9],
                    drivePrice: '35 $',
                    driveTravelDescription: 'For my wedding',
                    // Driver Info
                    driverFirstName: 'Jane',
                    driverUsername: 'just_jane',
                    driverProfilePicture: 'jane.jpg',
                }
            ];       
            if (driveResults.length === 0) {
                const resetAction = StackActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Travel'}),
                        NavigationActions.navigate({ 
                            routeName: 'RideStep4',
                            params: {
                                ride: this.state.ride
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
                            routeName: 'RideResults',
                            params: {
                                ride: this.state.ride,
                                driveResults: driveResults
                            }
                        })
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            }
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