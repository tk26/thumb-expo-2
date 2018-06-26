import React, { Component } from 'react';
import {Card, Text, Icon, Button, Grid, Col, Row, Left, Right } from 'native-base';
import TimeAgo from 'react-native-timeago';

export default class PostItem extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            loading: true
        };
      }

    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({loading: false});
      }

    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return(
            <Card style={styles.card}>
                <Grid>
                    <Col style={styles.leftCardItem}>
                        <Row>
                            <Button transparent>
                                <Icon active name="person" />
                            </Button>                            
                        </Row>
                        <Row>
                            <Text style={styles.cardText}>{this.props.postData.city}</Text>
                        </Row>
                        <Row>
                            <Text style={styles.cardText}>{new Date(this.props.postData.date).toLocaleDateString()}</Text>
                        </Row>                  
                    </Col>
                    <Col>
                        <Row>
                            <Left>
                                <Text style={styles.cardText}>{this.props.postData.firstName}</Text>
                            </Left>
                            <Left>
                                <Text style={styles.cardText}>{this.props.postData.username}</Text>
                            </Left>
                            <Right>
                                <TimeAgo style={styles.cardText} time={this.props.postData.createdDate} hideAgo={true} interval={20000} />
                            </Right>
                        </Row>
                        <Row>
                            <Left>
                                <Text style={styles.cardText}>{this.props.postData.caption}</Text>
                            </Left>
                        </Row>
                        <Row>
                            <Col>
                                <Button transparent>
                                    <Icon active name="heart" />                            
                                </Button>
                            </Col>
                            <Col>
                                <Button transparent>
                                    <Icon active name="musical-note" />
                                </Button>
                            </Col>
                            <Col>
                                <Button transparent outline style={styles.nonIconButton}>
                                    <Text style={styles.nonIconButtonText}>Offer Ride</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button transparent outline style={styles.nonIconButton}>
                                    <Text style={styles.nonIconButtonText}>Recommend</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </Card>
        );
    }
}

const styles = {
    card : {
        marginTop: 0,
        marginBottom: 1
    },
    leftCardItem : {
        flex: 0.3,
        flexDirection: "column"
    },
    cardText : {
        fontSize: 11
    },
    topCardItem : {
    },
    nonIconButton : {
        width: 100
    },
    nonIconButtonText: {
        fontSize: 8
    }
}