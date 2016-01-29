/**
 * Created by epotignano on 12/01/16.
 */

var React = require('react-native');

var Dimensions= require('Dimensions');
var windowsSize = Dimensions.get('window');

import Button from 'apsl-react-native-button'

var api =require("../utils/api/UserApi");



var t = require('tcomb-form-native');

var I18nService = require('../i18n');

I18nService.set('ja-JP', {
        'registerWithFacebook': 'Facebookで始める',
        'registerUsername': 'ユーザー名 (必須)',
        'registerMail': 'メールアドレス (必須)',
        'registerDisplayName': '表示ユーザー名	(必須)',
    }
);

var I18n = I18nService.getTranslations();

var {
    View,
    Text,
    StyleSheet
    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var styles = {
    Search: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#0000'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
};

var styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    facebookContainer: {
        backgroundColor: "#2A406B",
        height: windowsSize.height * 0.2,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    facebookButton: {
        flex:1,
        borderColor: '#2A406B',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3,
        width: windowsSize.width * 0.75,
        marginLeft: windowsSize.width * 0.125,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginButtonContainer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginButton: {
        flex:1,
        borderColor: '#EEEEEE',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3,
        width: windowsSize.width * 0.5,
        marginLeft: windowsSize.width * 0.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    registerButton : {
        flex:1,
        borderColor: '#00b9f7',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3,
        width: windowsSize.width * 0.4,
        marginLeft: windowsSize.width * 0.30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginText: {
        color: "##444444",
        fontSize: 25
    },

    registerText: {
        color: "##444444",
        fontSize: 20
    },


    facebookText: {
        color:"#FFF",
        fontSize: 25
    }
});

var Form = t.form.Form;

var UserCredentials = t.struct({
    username: t.String,
    email: t.String,
    displayName: t.String
});

var options = {


};

var username = {

};
var Register  = React.createClass({
    loginWithFacebook() {
        FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
            if (!error) {
                console.info("Login data: ", data);
            } else {
                console.info("Error: ", data);
            }
        })
    },

    register(){
        var _data = this.refs.form.getValue();
        if(_data) {
            api.registerNewUser(_data)
                .then(data => {
                    console.warn(data)
                })
        }
    },

    login() {
        var NavigationSubject =require("../services/NavigationManager").getStream();
        NavigationSubject.onNext({path: 'login'})
    },

    render() {
        return(
            <View style={styles.Search}>
                <View style={styles.facebookContainer}>
                    <Button style={styles.facebookButton} textStyle={styles.facebookText} onPress={this.loginWithFacebook}>
                        <Text>
                            { I18n.t('registerWithFacebook') }
                        </Text>
                    </Button>
                </View>
                <Form ref="form" type={UserCredentials}/>

                <View style={styles.loginButtonContainer}>
                    <Button style={styles.loginButton} textStyle={styles.loginText}
                            onPress={this.register}>
                        { I18n.t('register')}
                    </Button>
                </View>
                <View style={styles.loginButtonContainer}>
                    <Text>
                        か
                    </Text>
                </View>
                <View style={styles.loginButtonContainer}>
                    <Button style={styles.registerButton} textStyle={styles.registerText}
                            onPress={this.login}>
                        { I18n.t('login')}
                    </Button>
                </View>

            </View>
        );
    }
});

module.exports = Register;