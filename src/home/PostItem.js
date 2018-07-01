import React, { Component } from 'react';
import {Card, Text, Icon, Button, Grid, Col, Row, Left, Right, Thumbnail } from 'native-base';
import TimeAgo from 'react-native-timeago';
const defaultProfilePic = require('../../assets/default-profile-picture.png'); 

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

    getProfilePic(picture){
        return picture === '' ? defaultProfilePic : {uri: picture};
    }

    openPost(post){
        console.log(post.postId);
    }

    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return(
            <Card style={styles.card}>
                <Grid onTouchEnd={() => this.openPost(this.props.postData)}>
                    <Col style={styles.leftCardItem}>
                        <Row>
                            <Thumbnail source={this.getProfilePic(this.props.postData.profilePicture)}/>                           
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
                            <Col>
                                <Text style={styles.firstNameText}>{this.props.postData.firstName}</Text>
                            </Col>
                            <Col>
                                <Text style={styles.userNameText}>@{this.props.postData.username}</Text>
                            </Col>
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
                            <Col style = {styles.iconButton}>
                                <Button transparent>
                                    <Icon active name="heart" />                            
                                </Button>
                            </Col>
                            <Col style = {styles.iconButton}>
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
    firstNameText : {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "right",
        marginRight: 4
    },
    userNameText : {
        fontSize: 14,
        textAlign: "left"
    },
    cardText : {
        fontSize: 12
    },
    topCardItem : {
    },
    nonIconButton : {
        width: 90
    },
    iconButton : {
        width: 55
    },
    nonIconButtonText: {
        fontSize: 8
    }
}