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


var Form = t.form.Form;

var BuyForm = t.struct({
    fromEmail: t.String,
    fromName: t.String
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
        if(this.refs.form) {
            var value = this.refs.form.getValue();
            _params.fromEmail = value.fromEmail
            _params.fromName = value.fromName
        };
        var  _params= {
            subject : "Subject",
            content: ""
        }

        this.state.selectedSchools.map((element) => {
            _params.content += element.value;
        })
        communication.sendMail(_params)
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

