import React, { Component } from 'react';
import { View, Text, Button, Image, Picker, TextInput } from 'react-native';
import { MapView, Location } from 'expo';

const initialState = {
    region: { 
        latitude: 39.716859, 
        longitude: -86.295595, 
        latitudeDelta: 2.4, 
        longitudeDelta: 1.8
    },
    locationResult: null,
    startLocation: {
        latitude: 39.716859, longitude: -86.295595
    },
    startAddress: '',
    endLocation: {
        latitude: 39.184405, longitude: -86.538042
    },
    endAddress: '',
    manualStartAddress: '',
    manualEndAddress: '',
    availableSeats: 'none',
    error: '',
};

export default class DriveStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        Location.setApiKey('AIzaSyBM4s2TPgaBA9JMCMMZv_VlRGdTTkucQEU');
    }

    _handleMapRegionChange = region => {
        this.setState({ region });
    };

    _handleOnDragEndForStartLocation = e => {
        this.setState({            
            startLocation: e.nativeEvent.coordinate
        });
    }

    _handleOnDragEndForEndLocation = e => {
        this.setState({
            endLocation: e.nativeEvent.coordinate
        });
    }

    onValueChange(availableSeats) {
        this.setState({ availableSeats, error: '' });
    }

    locateManualAddresses = () => {
        if (this.state.manualStartAddress.length > 3) {
            Location.geocodeAsync(this.state.manualStartAddress)
                .then(location => {
                    location = location[0];
                    this.setState({
                        startLocation: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    });
                });
        }
        if (this.state.manualEndAddress.length > 3) {
            Location.geocodeAsync(this.state.manualEndAddress)
                .then(location => {
                    location = location[0];
                    this.setState({
                        endLocation: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    });
                });
        }
    }

    goNext = () => {        
        if (this.state.availableSeats === 'none') {
            this.setState({ error: "Please select available seats" });
            return;
        }

        Location.reverseGeocodeAsync(this.state.startLocation)
            .then(startAddress => {
                startAddress = startAddress[0];
                this.setState({ startAddress });
                Location.reverseGeocodeAsync(this.state.endLocation)
                    .then(endAddress => {
                        endAddress = endAddress[0];
                        this.setState({ endAddress });
                        // build a drive object to be passed through  
                        let drive = {
                            startLocation: {
                                address: this.state.startAddress,
                                latitude: this.state.startLocation.latitude,
                                longitude: this.state.startLocation.longitude
                            },
                            endLocation: {
                                address: this.state.endAddress,
                                latitude: this.state.endLocation.latitude,
                                longitude: this.state.endLocation.longitude
                            },
                            availableSeats: this.state.availableSeats
                        }
                        console.log(JSON.stringify(drive));
                        this.props.navigation.navigate('DriveStep2', { drive });
                    });
            });
    }

    render() {
        return (
            <View>
                <Text>Build your drive - Choose start and end location</Text>

                <MapView
                    style={{ alignSelf: 'stretch', height: 300 }}
                    region={this.state.region}
                    onRegionChange={this._handleMapRegionChange}
                >
                    <MapView.Marker draggable
                        coordinate={this.state.startLocation}
                        title="Start"
                        description="Your pickup location"
                        onDragEnd={this._handleOnDragEndForStartLocation}
                    />
                    <MapView.Marker draggable
                        coordinate={this.state.endLocation}
                        title="End"
                        description="Your dropoff location"
                        onDragEnd={this._handleOnDragEndForEndLocation}
                    />
                </MapView>

                <Text>Not able to find on the map ? Put exact address below and we will locate that for you</Text>

                <TextInput 
                    maxLength={100}
                    onChangeText={(manualStartAddress) => this.setState({ manualStartAddress })}
                    value={this.state.manualStartAddress}
                    placeholder="Start address"
                />

                <TextInput 
                    maxLength={100}
                    onChangeText={(manualEndAddress) => this.setState({ manualEndAddress })}
                    value={this.state.manualEndAddress}
                    placeholder="End address"
                />
                <Button title="OK" onPress={this.locateManualAddresses}/>

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