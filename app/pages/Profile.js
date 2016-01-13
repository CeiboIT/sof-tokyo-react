/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

var Badge = require('../components/user/Badge');
var storage = require('../services/Storage').getInstance();

var Login = require('./Login');

var {
    View,
    Text
    } = React;


class Profile extends React.Component{
    constructor(props) {
        super(props);
        if(props.id = 'me') {
            this.state = {
                user: storage['User']
            };
        }

    }

    render() {
        return (
            <View>
                <Badge data={this.state.user}/>
            </View>
        )
    }
}

Profile.PropTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;