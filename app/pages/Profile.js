/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

var Badge = require('../components/user/Badge');
var storage = require('../services/Storage').getInstance();
var GiftedSpinner = require('react-native-gifted-spinner');

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
        this.getUserData();
    }

    getUserData () {
        storage.load({
            key: 'User'
        }).then(ret => {
            this.setState({
                user: ret.data
            });
        });
    }


    render() {

        return(
            <View>
                <Badge data={this.state.user} />
            </View>
        );

    }
}

Profile.propTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;