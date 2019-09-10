// Responsible for routing
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/home';

import NoMatch from './pages/home';

class App extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home} />

                {/* when none of the above match, <NoMatch> will be rendered */}
                <Route component={NoMatch} />
            </Switch>
        );
    }
}

export default App;
