import React, { Component } from 'react';
import { Image, View, Text, Button, TextInput } from 'react-native';

const initialState = {
    startLocation: { address: '555 W Madison St', latitude: 41.881099, longitude: -87.641926 }, 
    endLocation: { address: '435 W Hoosier Ct Ave', latitude: 39.184405, longitude: -86.538042 }, 
    pickupNotes: '', error: '',
};

export default class RideStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    validate() {
        if (!this.state.startLocation.address ||
            !this.state.startLocation.latitude ||
            !this.state.startLocation.longitude) {
            this.setState({ error: "Please select a start address" });
            return;
        }

        if (!this.state.endLocation.address ||
            !this.state.endLocation.latitude ||
            !this.state.endLocation.longitude) {
            this.setState({ error: "Please select an end address" });
            return;
        }

        // validation success
        this.props.navigation.navigate('RideStep2', {
            ride: {
                startLocation: this.state.startLocation,
                endLocation: this.state.endLocation,
                pickupNotes: this.state.pickupNotes
            }
        });
    }

    render() {
        return (
            <View>
                {/*TODO: change to show user's profile picture*/}
                <Image
                    source={require('./../../assets/thumb-horizontal-logo.png')}
                />

                <Text>Build your ride</Text>

                <View>
                    <Text>
                        PICK UP NOTES
                    </Text>
                </View>

                <TextInput
                    maxLength={100}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="this will be shared with your driver"
                    onChangeText={(pickupNotes) => this.setState({ pickupNotes })}
                    value={this.state.pickupNotes}
                />

                <Button title="NEXT" onPress={() => this.validate()} />

                <View>
                    <Text>
                        {this.state.error}
                    </Text>
                </View>
            </View>
        );
    }
}