/**
 * Created by epotignano on 25/01/16.
 */
/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var GridView = require('react-native-grid-view');
var communication = require("../utils/api/CommunicationApi");
var user = require("../utils/api/UserApi");
var t = require("tcomb-form-native");
var Rx = require("rx");
var storage = require("../services/Storage");

var Form = t.form.Form;

var BuyForm = t.struct({
    email: t.String,
    name: t.String
});


var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
    } = React;

var SchoolElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight>
                    <Text >{this.props.school.value}</Text>
                </TouchableHighlight>
            </View>
        )
    }
})

SchoolElement.propTypes = {
    school: React.PropTypes.object,
    onSelect: React.PropTypes.any
}

var SchoolsCheckout = React.createClass({

    getInitialState(){
        return {
            isLoggedIn: true
        }
    },

    componentDidMount() {
        user.isAuthorized()
            .then((result) => {
                this.setState({
                    isLoggedIn: result['value']
                })
            }).catch(error => {
            this.setState({
                isLoggedIn: false
            })
        })
    },

    sendMail() {
        var _mailStream = new Rx.Subject();
        var value = this.refs.form.getValue();
        var  _params= {
            fromEmail : value.email,
            fromName : value.name,
            subject : "Subject",
            schools: this.props.schools
        };
        communication.sendMail(_params, _mailStream);
        _mailStream.subscribe((result) => {

        })
    },

    render() {
        return(
            <View>
                <GridView
                    items={this.props.schools}
                    itemsPerRow={1}
                    renderItem={(school) => <SchoolElement key={school.value} school={school} />}
                />

                <Form type={BuyForm} ref="form"/>
                <TouchableHighlight onPress={this.sendMail}>
                    <Text>
                        Finish
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }




});

SchoolsCheckout.propTypes = {
    schools: React.PropTypes.any
};

module.exports = SchoolsCheckout;

