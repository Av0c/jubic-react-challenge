import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect, Link } from "react-router-dom";

class NavBar extends Component {
    render() {
        var currentLocation = window.location.pathname;

        var linksRender = [];
        var pages = {
            "/": "Home",
            "/about": "About",
        }

        for (var key in pages) {
            linksRender.push(
                <Link key={"link-"+key} className={currentLocation == key ? "nav-links active" : "nav-links"} to={key}>{pages[key]}</Link>
            )
        }

        return (
            <div className="navbar">
                {linksRender}
            </div>
        );
    }
}

export default NavBar;
