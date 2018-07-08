import React, { Component } from 'react';
import { createRootNavigator } from './src/router';
import { isLoggedIn } from './src/auth';

// imports related to redux
import { createStore } from 'redux';
import reducers from './src/reducers';
import { Provider } from 'react-redux';

// build the redux store with reducers
const store = createStore(reducers);

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

        // pass on the store to the provider which makes it available to all the components
        return <Provider store={store}><Layout /></Provider>
    }
}