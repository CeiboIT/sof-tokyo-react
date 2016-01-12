/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

var Login = require('./Login');

var {
    View,
    Text
    } = React;


class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    render() {
        var renderMe;

        return (
            <View>
                <Text>Ay vida!</Text>
            </View>
        )
    }
}

module.exports = Profile;