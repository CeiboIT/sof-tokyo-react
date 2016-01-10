/**
 * Created by mmasuyama on 1/8/2016.
 */

var icons = {};
icons.toggle = require("./components/actions/ToggleMenu");


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