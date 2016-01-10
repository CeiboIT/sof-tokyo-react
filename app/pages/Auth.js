/**
 * Created by epotignano on 10/01/16.
 */
/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');

var Login = require('Login');
// var Register = require('../components/auth/Login');

var {
    View
} = React;

var Auth = React.createClass ({
    render(){
        return(
            <View>
                <Login/>
            </View>

        )
    }
});

module.exports = Auth;