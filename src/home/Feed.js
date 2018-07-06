import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Body, Text, Button } from 'native-base';
import PostItem from './PostItem';
import moment from 'moment';
import { getApiUrl } from '.././helper';

const initialState = {
    error: '',
    posts: [],
    loading: true,
    refreshing: false,
    lastTimestamp: '1/1/2018'
}

export default class Feed extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;

        //TODO: Need to move this out of here
        moment.updateLocale('en', {
            relativeTime : {
                future: "in %s",
                past:   "%s ago",
                s  : '1s',
                ss : '%ds',
                m:  "1m",
                mm: "%dm",
                h:  "1h",
                hh: "%dh",
                d:  "1d",
                dd: "%dd",
                M:  "1m",
                MM: "%dm",
                y:  "1y",
                yy: "%dy"
            }
        });        
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({loading: false});
      }
    componentDidMount() {
        this._refreshData();
    }

    _refreshData = function(){
        this.setState({refreshing: true});
        let responseStatus;

        fetch(getApiUrl() + '/home/feed?fromTimestamp='+ this.state.lastTimestamp,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + ' ' + global.auth_token
            }
        })
        .then( response => {
            responseStatus = response.status
            return response.json();
        })
        .then (response => {
            let posts = response;
            let lastTimestamp;
            if (responseStatus === 200 && response.length > 0) {
                lastTimestamp = posts[0].postedOn;
                posts = posts.concat(this.state.posts);
                this.setState({
                    posts: posts,
                    lastTimestamp: lastTimestamp
                });
            }
            this.setState({
                refreshing: false
            });
        })
        .catch( error => {
            // TODO log error
            console.log(error);
            this.setState({
                error: "Error refreshing feed",
                refreshing: false
            })
        })
    }

    render(){
        if (this.state.loading) {
            return <Expo.AppLoading />;
        }

        if (this.state.posts.length > 0){
            return (
                <View>
                    <FlatList
                        data={this.state.posts}
                        renderItem={({item}) => <PostItem postData={item}/>}
                        onRefresh={() => this._refreshData()}
                        refreshing={this.state.refreshing}
                    />
                    <Text>{this.state.error}</Text>
                </View>
        );
        }
        else {
            return (<Body>
                <Button
                    style={styles.noPostsFoundButton}
                    onPress={() => this._refreshData()}
                >
                    <Text>Bummer, no posts found.  Tap to refresh.</Text>
                </Button>  
                <Text>{this.state.error}</Text>  
            </Body>);
        }
    }
}

const styles = {
    headerStyle : {
    },
    buttonStyle: {
        backgroundColor: 'white'
    },
    noPostsFoundButton : {
        backgroundColor: 'white',
        flex: 1
    }
}