import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

const { width } = Dimensions.get('window');

export default class DriveResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const drive = this.props.navigation.state.params.drive;
        const rideResults = this.props.navigation.state.params.rideResults;
        
        return (
            <View>
                <Text>
                    {/* {JSON.stringify(ride.startLocation.address)}
                    {'\n'}
                    {JSON.stringify(ride.endLocation.address)}
                    {'\n'}
                    {ride.travelDate}
                    {'\n'}
                    {ride.travelTime[0]}:00 to {ride.travelTime[1]}:00
                    {'\n'}
                    {ride.pickupNotes}
                    {'\n'}
                    {ride.travelDescription}
                    {'\n'} */}
                </Text>

                <Text>Trip Results</Text>
                
                <Button title="X" 
                    onPress={() => {
                        // Take me to the thumb tab
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ 
                                    routeName: 'LoggedInTabs',
                                    action: NavigationActions.navigate({ 
                                        routeName: 'Thumb'
                                    })
                                })
                            ],
                            key: null
                        });
                        this.props.navigation.dispatch(resetAction);
                    }}
                />

                <ScrollView 
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    style={styles.container}
                    horizontal= {true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={"center"}
                    contentInset={{
                        top: 0,
                        left: 30,
                        bottom: 0,
                        right: 30,
                    }}>
                    {   
                        rideResults.map(ride => {
                            return (
                                <View key={ride.rideId} style={styles.view}>
                                    <TouchableHighlight>
                                        <Text>
                                            {ride.rideDate}
                                            {'\n'}
                                            {ride.rideTimes[0]} to {ride.rideTimes[1]}
                                            {'\n'}
                                            {ride.ridePickupNotes} 
                                            {'\n'}
                                            {ride.rideTravelDescription}
                                            {'\n'}
                                            {ride.riderFirstName}
                                            {'\n'}
                                            {ride.riderUsername}
                                            {'\n'}
                                            {ride.riderProfilePicture}
                                            {'\n'}
                                        </Text>
                                    </TouchableHighlight>

                                    <Button title="Invite Rider" onPress={() => {}} />
                                </View>
                            );
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    view: {
        marginTop: 100,
        width: width - 80,
        margin: 10,
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
    }
});