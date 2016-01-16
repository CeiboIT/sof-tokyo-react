/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

var Badge = require('../components/user/Badge');

var api = require('../utils/api/UserApi');
var storage = require('../services/Storage').getInstance();
var GiftedSpinner = require('react-native-gifted-spinner');

var {
    View,
    Text
    } = React;


var Profile = React.createClass({

    getInitialState() {
        return {
            user: {},
            isLoading: true
        }
    },

    componentWillMount() {
        this.getUserData('me');
        UserStream.subscribe((data) => {
            this.setState({
                user: data.data
            })
        })
    },

    getUserData(id) {
        if(id = 'me'){
            storage.load({key: 'UserId'})
            .then((ret) => {
                api.getUser(ret.data)
            })
        }
    },

    render() {

        return(
            <View>
                <Badge data={this.state.user} />
            </View>
        );

    }
});

Profile.propTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;