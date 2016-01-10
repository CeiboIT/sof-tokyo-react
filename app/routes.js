/**
 * Created by mmasuyama on 1/8/2016.
 */

var icons = {};
icons.toggle = require("./components/ToggleMenu");
var Main = require('./components/Main');
var Search = require('./components/Search');
var PostsList = require("./components/PostsList");
var Login = require("./components/Login");
var SitePanel = require("./components/SitePanel");
var FooterNav = require("./components/FooterNav");




module.exports = {
    getRoutes : () => { return {
        "feed": {
            "component": PostsList,
            name: "Feed",
            leftCorner: icons.toggle
        },

        "login": {
            "component": Login,
            "name": "Login"
        }
    };}
};