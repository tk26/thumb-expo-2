import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

const { width } = Dimensions.get('window');

export default class RideResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ride = this.props.navigation.state.params.ride;
        const driveResults = this.props.navigation.state.params.driveResults;
        
        return (
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
                    {'\n'}
                    {ride.travelDescription}
                    {'\n'}
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
                        driveResults.map(drive => {
                            return (
                                <View key={drive.driveId} style={styles.view}>
                                    <TouchableHighlight>
                                        <Text>
                                            {drive.travelDate}
                                            {'\n'}
                                            {drive.travelTime}
                                            {'\n'}
                                            {"$ 31"} 
                                            {'\n'}
                                            {drive.travelDescription}
                                            {'\n'}
                                            {drive.userFirstName}
                                            {'\n'}
                                            {drive.userName}
                                            {'\n'}
                                            {drive.userProfilePicture}
                                            {'\n'}
                                        </Text>
                                    </TouchableHighlight>

                                    <Button title="Invite Driver" onPress={() => {
                                        this.props.navigation.navigate('InviteDriver', { drive, ride });
                                    }} />
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