import React, { Component } from 'react';
import { Image, View, Text, Button, TextInput } from 'react-native';
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
    pickupNotes: '',
    error: ''
}

export default class RideStep1 extends Component {
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

    goNext = () => {
        Location.reverseGeocodeAsync(this.state.startLocation)
            .then(startAddress => {
                startAddress = startAddress[0];
                this.setState({ startAddress });
                Location.reverseGeocodeAsync(this.state.endLocation)
                    .then(endAddress => {
                        endAddress = endAddress[0];
                        this.setState({ endAddress });
                        // build a ride object to be passed through  
                        let ride = {
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
                            pickupNotes: this.state.pickupNotes
                        }
                        console.log(JSON.stringify(ride));
                        this.props.navigation.navigate('RideStep2', { ride });
                    });
            });
    }

    render() {
        return (
            <View>
                <Text>Build your ride - Choose pickup and dropoff locations</Text>
                
                <MapView
                    style={{ alignSelf: 'stretch', height: 350 }}
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

                <Text>PICK UP NOTES</Text>

                <TextInput
                    maxLength={100}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="this will be shared with your driver"
                    onChangeText={(pickupNotes) => this.setState({ pickupNotes })}
                    value={this.state.pickupNotes}
                />

                <Button title="NEXT" onPress={this.goNext} />

                <Text>{this.state.error}</Text>
            </View>
        );
    }
}