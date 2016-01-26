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
        var _params;
        var _mailStream = new Rx.Subject();
        if(!this.state.isLoggedIn) {
            var value = this.refs.form.getValue();
            var  _params= {
                fromEmail : value.email,
                fromName : value.name,
                subject : "Subject",
                content: ""
            };
            this.props.schools.map((element) => {
                _params.content += element.value;
            });
            communication.sendMail(_params);
        } else {
            var _stream = new Rx.Subject();
            storage.load({key: 'UserId'})
                .then(ret => {
                    user.getMember(ret.data, _stream)
                })

            _stream.subscribe((data) => {
                communication.sendMail(_params)
            })

        }

        _mailStream.subscribe((result) => {

        })
    },

    render(){
        console.warn(Object.keys(this.props));

        var _form = <Form type={BuyForm} ref="form"/>

        var _renderForm = (!this.state.isLoggedIn) ? _form: null

        return(
            <View>
                <GridView
                    items={this.props.schools}
                    itemsPerRow={1}
                    renderItem={(school) => <SchoolElement key={school.value} school={school} />}
                />

                {_renderForm}

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
}

module.exports = SchoolsCheckout;

