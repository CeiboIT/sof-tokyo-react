/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

var Badge = require('../components/user/Badge');
var storage = require('../services/Storage').getInstance();

import LoadingContainer from 'react-native-loading-container';

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
        console.warn(Object.keys(this.state.user))

    }

    async getUserData () {
        let _data = await storage.load({
            key: 'User'
        });

        this.setState({
            user: data.data
        });

        return _data;
    }


    render() {

        var view= (
            <View>
                <Badge data={this.state.user}/>
            </View>
        );

        if(this.state.user['id']){
            _render = view;
        } else {
            _render = (<Text>Te quiero y vos nada, Ay vida</Text>)
        }

        return _render;
    }
}

Profile.PropTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;