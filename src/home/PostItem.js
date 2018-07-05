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
        return picture === '' || picture === null ? defaultProfilePic : {uri: picture};
    }

    openPost(post){
        console.log(post.postId);
    }

    thumbnailStyle(postType){
        const borderColor = postType === 'RIDE' ? '#6200EE' : '#03DAC6';
        return {
            borderWidth: 1,
            borderColor: borderColor
        }
    }

    getButtonText(postType) {
        return postType === 'RIDE' ? 'Offer Ride' : 'Ride With';
    }

    cardStyle(postType){
        const borderColor = postType === 'RIDE' ? '#6200EE' : '#03DAC6';
        return {
            marginTop: 0,
            marginBottom: 0,
            padding: 2,
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: borderColor
        }
    }

    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }
        return(
            <Card style={this.cardStyle(this.props.postData.postType)}>
                <Grid onTouchEnd={() => this.openPost(this.props.postData)}>
                    <Col style={styles.leftCardItem}>
                        <Row>
                            <Thumbnail source={this.getProfilePic(this.props.postData.profilePicture)} style={this.thumbnailStyle(this.props.postData.postType)}/>                      
                        </Row>
                        <Row>
                            <Text style={styles.cardText}>{new Date(this.props.postData.date).toLocaleDateString()}</Text>
                        </Row>   
                        <Row>
                            <Text style={styles.cardText}>{this.props.postData.city}</Text>
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
                                <TimeAgo style={styles.cardText} time={this.props.postData.postedOn} hideAgo={true} interval={20000} />
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
                                    <Text style={styles.nonIconButtonText}>{this.getButtonText(this.props.postData.postType)}</Text>
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
    leftCardItem : {
        flex: 0.3,
        flexDirection: "column"
    },
    firstNameText : {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "left",
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