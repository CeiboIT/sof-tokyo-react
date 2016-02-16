var React = require('react-native'),
    GridView = require('react-native-grid-view'),
    communication = require("../utils/api/CommunicationApi"),
    user = require("../utils/api/UserApi"),
    t = require("tcomb-form-native"),
    Rx = require("rx"),
    storage = require("../services/Storage"),
    I18nService = require('../i18n');

I18nService.set('ja-JP', {
        'nameForCheckout' : 'お名前',
        'emailForCheckout': 'メールアドレス'
    }
);

var I18n = I18nService.getTranslations(),
    Form = t.form.Form;
    
var BuyForm = t.struct({
    email: t.String,
    name: t.String
});

var BuyFormOptions = {
    fields: {
        email: { label: I18n.t('emailForCheckout')},
        name: { label: I18n.t('nameForCheckout')}
    }
}

var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
     schools : {
        borderColor: "transparent",
        borderWidth: 1,
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
     },
     checkOut : {
        padding: 5,
        borderWidth: 1,
        borderColor: "#8a52ad",
        margin : 10,
        justifyContent: "center",
        alignItems: "center"
     },
     checkOutText : {
         color: "#8a52ad"
     }
});

var SchoolElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight underlayColor={'transparent'} style={styles.schools}>
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

                <Form type={ BuyForm } options={ BuyFormOptions } ref="form"/>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.sendMail} style={styles.checkOut}>
                    <Text style={styles.checkOutText}>
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

