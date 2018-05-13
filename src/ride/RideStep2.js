import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const initialState = {
    travelDate: '', travelTime: [8, 16], error: ''
}

export default class RideStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    travelTimesChange = (values) => {
        this.setState({
            travelTime: values,
            error: ''
        });
    }

    validate() {
        if (this.state.travelDate === '') {
            this.setState({ error: "Please select your travel date" });
            return;
        }

        if (this.state.travelTime[1] - this.state.travelTime[0] < 4) {
            this.setState({ error: "Please select a time range of minimum 4 hours" });
            return;
        }

        // validation success
        this.props.navigation.navigate('RideStep3', {
            ride: {
                startLocation: this.props.navigation.state.params.ride.startLocation,
                endLocation: this.props.navigation.state.params.ride.endLocation,
                pickupNotes: this.props.navigation.state.params.ride.pickupNotes,
                travelDate: this.state.travelDate,
                travelTime: this.state.travelTime,
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

                <View>
                    <Text>
                        {JSON.stringify(this.props.navigation.state.params.ride.startLocation.address)}
                        {'\n'}
                        {JSON.stringify(this.props.navigation.state.params.ride.endLocation.address)}
                        {'\n'}
                        {this.props.navigation.state.params.ride.pickupNotes}
                    </Text>
                </View>

                <View>
                    <Text>
                        What day?
                    </Text>
                </View>
                <DatePicker
                    style={{ width: 200 }}
                    date={this.state.travelDate}
                    mode="date"
                    placeholder="select travel date"
                    format="MM-DD-YYYY"
                    minDate={new Date(moment())}
                    maxDate={new Date(moment().add(1, 'y'))}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => { this.setState({ travelDate: date, error: '' }) }}
                />

                <View>
                    <Text>
                        And preferred time?
                    </Text>
                </View>

                <View style={styles.sliders}>
                    <View style={styles.sliderOne}>
                        <Text style={styles.text}>{this.state.travelTime[0]}:00 </Text>
                        <Text style={styles.text}>{this.state.travelTime[1]}:00</Text>
                    </View>
                    <MultiSlider
                        values={[this.state.travelTime[0], this.state.travelTime[1]]}
                        sliderLength={280}
                        onValuesChange={this.travelTimesChange}
                        min={0}
                        max={24}
                        step={1}
                    />
                </View>

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

var styles = StyleSheet.create({
    sliders: {
        margin: 20,
        width: 280,
    },
    text: {
        alignSelf: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});