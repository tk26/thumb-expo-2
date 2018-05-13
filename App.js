import React, { Component } from 'react';
import { createRootNavigator } from './src/router';
import { isLoggedIn } from './src/auth';

const initialState = {
    loggedIn: false,
    isLoggedInChecked: false
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        isLoggedIn()
            .then(response => {
                this.setState({
                    loggedIn: response,
                    isLoggedInChecked: true
                })
            })
    }

    render() {
        if (!this.state.isLoggedInChecked) {
            return null;
        }
        const Layout = createRootNavigator(this.state.loggedIn);
        return <Layout />
    }
}