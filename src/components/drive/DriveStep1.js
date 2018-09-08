import React, { Component } from 'react';
import { View, Text, Button, Image, Picker, TextInput } from 'react-native';

const GOOGLE_API_KEY = 'AIzaSyBjmDuIk2aL8CbCi6FBr7ExGhms42k7ZEw';

const initialState = {
    startLocation: {
        address: '', latitude: '', longitude: '', city: ''
    },
    endLocation: {
        address: '', latitude: '', longitude: '', city: ''
    },
    startAddress: '', endAddress: '',
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

    validateAndGeocodeAddresses() {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+
            this.state.startAddress + '&key='+ GOOGLE_API_KEY, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.length === 0) {
                throw Error('No response found');
            }
            let formattedAddress = response.results[0].formatted_address;
            let formattedAddressArr = formattedAddress.split(',');
            this.setState({
                startLocation: {
                    address: formattedAddress,
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng,
                    city: formattedAddressArr[formattedAddressArr.length - 3].trim() || ''
                },
                startAddress: formattedAddress
            });
        })
        .then(() => {
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+
                this.state.endAddress + '&key='+ GOOGLE_API_KEY, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                return response.json()
            })
            .then(response => {
                if (response.length === 0) {
                    throw Error('No response found');
                }
                let formattedAddress = response.results[0].formatted_address;
                let formattedAddressArr = formattedAddress.split(',');
                this.setState({
                    endLocation: {
                        address: formattedAddress,
                        latitude: response.results[0].geometry.location.lat,
                        longitude: response.results[0].geometry.location.lng,
                        city: formattedAddressArr[formattedAddressArr.length - 3].trim() || ''
                    },
                    endAddress: formattedAddress
                });
                // build a drive object to be passed through
                let drive = {
                    startLocation: this.state.startLocation,
                    endLocation: this.state.endLocation,
                    availableSeats: this.state.availableSeats
                }
                console.log(JSON.stringify(drive));
                this.props.navigation.navigate('DriveStep2', { drive });
            })
            .catch(() => {
                // TODO log error: Refer https://developers.google.com/maps/documentation/geocoding/intro?csw=1#StatusCodes
                this.setState({ error: 'Some error occured. Please try putting a correct address again.' });
            });
        })
        .catch(() => {
            // TODO log error: Refer https://developers.google.com/maps/documentation/geocoding/intro?csw=1#StatusCodes
            this.setState({ error: 'Some error occured. Please try putting a correct address again.' });
        });
    }

    goNext(){
        if (this.state.availableSeats === 'none') {
            this.setState({ error: "Please select available seats" });
            return;
        }

        if (this.state.startAddress.length < 10) {
            this.setState({ error: 'Please make sure your start address is valid' });
            return;
        }

        if (this.state.endAddress.length < 10) {
            this.setState({ error: 'Please make sure your end address is valid' });
            return;
        }

        this.validateAndGeocodeAddresses();
    }

    render() {
        return (
            <View>
                <Text>Build your drive - Choose start and end location</Text>

                <TextInput
                    maxLength={100}
                    onChangeText={(startAddress) => this.setState({ startAddress, error: '' })}
                    value={this.state.startAddress}
                    placeholder="Start address"
                />

                <TextInput
                    maxLength={100}
                    onChangeText={(endAddress) => this.setState({ endAddress, error: '' })}
                    value={this.state.endAddress}
                    placeholder="End address"
                />

                <Text>And available seats ?</Text>

                <Picker
                    selectedValue={this.state.availableSeats}
                    onValueChange={this.onValueChange.bind(this)}
                    style={{ height: 20, width: 100 }}
                    >
                    <Picker.Item label="Select Available Seats" value="none" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                </Picker>

                <Button title="NEXT" onPress={this.goNext} />

                <Text>{this.state.error}</Text>
            </View>
        );
    }
}
