// Responsible for routing
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./style/main.less";

import Home from './pages/home';

class App extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home} />

                {/* when none of the above match, <NoMatch> will be rendered
                <Route component={NoMatch} />
                */}
            </Switch>
        );
    }
}


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);

module.hot.accept();
