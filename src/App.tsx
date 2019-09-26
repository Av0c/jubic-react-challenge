// Responsible for routing
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./style/main.less";

import Home from './pages/home';

ReactDOM.render(
    <Home />,
    document.getElementById("app")
);
