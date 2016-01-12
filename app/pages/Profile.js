/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
import Storage from 'react-native-storage';
var UserStream = require("../services/Streams").getStream("User");

var Login = require('./Login');

var _storage = new Storage({
    size: 1000,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true
});


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
        if(!this.state.user['id']) {
            // if is not logged, redirect to login!
            var NavigationSubject = require("../services/NavigationManager").getStream();
            NavigationSubject.onNext({path:'login'})
        }
        return (
            <View>
                <Text>Ay vida!</Text>
            </View>
        )
    }
}

module.exports = Profile;