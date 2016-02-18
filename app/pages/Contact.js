var React = require('react-native'),
    Rx = require("rx"),
    I18n = require('../i18n').getTranslations(),
    t = require('tcomb-form-native');
    
import Button from 'apsl-react-native-button'

var {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator
    } = React;


var styles = {
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    title: {
        marginBottom: 20
    },
    titleText : {
        fontSize: 18,
        color: '#444444'
    },
    submit : {
        borderColor: "#8a52ad",
        borderWidth: 1,
        padding: 5,
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    submitText : {
        color: "#8a52ad"
    },
    whiteText : {
        color: 'white'
    }
}


var ContactForm = t.struct({
    fromEmail: t.String,
    fromName: t.String,
    fromSubject: t.String,
    fromMessage: t.String
});

var ContactFormOptions = {
    fields: {
        fromEmail: { label: I18n.t('email')},
        fromName: { label: I18n.t('name')},
        fromSubject: { label: I18n.t('subject')},
        fromMessage: { label: I18n.t('message')}
    }
}

var Form = t.form.Form

var Contact =  React.createClass({

    getInitialState(){
        return {
            isLoading: false,
            error: false,
            pressIn: false
        };
    },

    submit(){
        var _contactStream = new Rx.Subject();
        var value = this.refs.form.getValue();
        
        var  _params= {
            fromEmail : value.fromEmail,
            fromName : value.fromName,
            fromSubject : value.fromSubject,
            fromMessage : value.fromMessage
        };
    },
    
    togglePressIn(){
        this.setState({
            pressIn: !this.state.pressIn
        });
    },
    
    pressColor(){
        if(this.state.pressIn) {
            return styles.whiteText
        }
    },
    
    render() {
        return(
            <ScrollView style={{backgroundColor: '#F7F7F7', padding: 10}}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            お問い合わせ
                        </Text>
                    </View>
                    <Form type={ ContactForm } options={ ContactFormOptions } ref="form"/>
                    <TouchableHighlight underlayColor={'#8a52ad'} onPress={this.submit} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn} style={styles.submit}>
                        <Text style={[styles.submitText, this.pressColor()]}>
                            送信
                        </Text>
                    </TouchableHighlight>
                </View>
          </ScrollView>
        );
    }
})

module.exports = Contact;