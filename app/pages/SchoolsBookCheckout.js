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
var I18nService = require('../i18n');

I18nService.set('ja-JP', {
        'nameForCheckout' : 'お名前',
        'emailForCheckout': 'メールアドレス'
    }
);

var I18n = I18nService.getTranslations();


var Form = t.form.Form;

var BuyForm = t.struct({
    fromEmail: t.String,
    fromName: t.String
});

var BuyFormOptions = {
    fields: {
        fromEmail: { label: I18n.t('emailForCheckout')},
        fromName: { label: I18n.t('nameForCheckout')}
    }
}

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
                <TouchableHighlight underlayColor={'transparent'}>
                    <Text>{this.props.school.value}</Text>
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
            fromEmail : value.fromEmail,
            fromName : value.fromName,
            schools: this.props.schools
        };
        communication.sendMail(_params, _mailStream);
        _mailStream.subscribe((result) => {
            console.warn(result);
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

                <Form type={ BuyForm } options={ BuyFormOptions } ref="form"/>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.sendMail}>
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

