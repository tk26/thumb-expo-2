import React, { Component } from 'react';
import { View, Text, Button, Image, Picker } from 'react-native';

const initialState = {
    startLocation: { address: '555 W Madison St', latitude: 41.881099, longitude: -87.641926 },
    endLocation: { address: '435 W Hoosier Ct Ave', latitude: 39.184405, longitude: -86.538042 },
    availableSeats: 'none', 
    error: '',
};

export default class DriveStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onValueChange(availableSeats) {
        this.setState({ availableSeats, error: '' });
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

        if (this.state.availableSeats === 'none') {
            this.setState({ error: "Please select available seats" });
            return;
        }

        // validation success
        this.props.navigation.navigate('DriveStep2', {
            drive: {
                startLocation: this.state.startLocation,
                endLocation: this.state.endLocation,
                availableSeats: this.state.availableSeats
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

                <Text>Build your drive</Text>

                <View>
                    <Text>
                        And available seats ?
                    </Text>
                </View>
                <Picker
                    selectedValue={this.state.availableSeats}
                    onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="Select Available Seats" value="none" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>

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