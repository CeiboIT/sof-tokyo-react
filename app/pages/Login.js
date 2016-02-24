var React = require('react-native'),
    Dimensions= require('Dimensions'),
    windowsSize = Dimensions.get('window'),
    Button = require('apsl-react-native-button'),
    api =require("../utils/api/UserApi"),
    t = require('tcomb-form-native'),
    I18nService = require('../i18n'),
    Icon = require('react-native-vector-icons/FontAwesome'),
    UserSubject = require("../services/Streams").getStream("User");

import Popup from 'react-native-popup';

I18nService.set('ja-JP', {
        'login' : 'ログイン',
        'loginWithFacebook': 'Facebookで始める',
        'register': '登録 ',
        'error_login_100': 'Username or password invalid'
    }
);

var I18n = I18nService.getTranslations();

var {
    View,
    Text,
    StyleSheet
    } = React;

var styles = {
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
    container : {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    buttonsContainer: {
        flex: 1,
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
        marginTop: 5,
        marginLeft: windowsSize.width * 0.30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginText: {
        color: "#444444",
        fontSize: 25
    },

    registerText: {
        color: "#444444",
        fontSize: 20
    }
});

var Form = t.form.Form;

var UserCredentials = t.struct({
    username: t.String,
    password: t.String
});

var options = {

};

var username = {

};

var storage = require("../services/Storage").getInstance();

var Login  = React.createClass({
    loginWithFacebook() {
        FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
            if (!error) {
                console.info("Login data: ", data);
            } else {
                console.info("Error: ", data);
            }
        })
    },

    login(){
        var _credentials = this.refs.form.getValue();
        if(_credentials) {
            api.sendCredentials(_credentials);
            UserSubject.subscribe((response)=>{
                console.warn('Login > login ', JSON.stringify(response));
                if (response.type === 'login') {
                    if (!response.data.error) {
                        storage.save({
                            key: 'cookies',
                            rawData : {
                                cookieName: response.data['cookie_name'],
                                cookie: response.data['cookie']
                            }
                        });
                        storage.save({
                            key: 'UserId',
                            rawData : {
                                data: response.data['user']['id']
                            }
                        });
                        var NavigationSubject = require("../services/NavigationManager").getStream();
                        NavigationSubject.onNext({path: 'feed'})
                    } else {
                        console.warn('Login > login error', JSON.stringify(response.data));
                        this.popup.alert(I18n.t('error_login_' + response.data.code));
                    }
                }
            })
        }
    },

    register() {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        NavigationSubject.onNext({path: 'register'})
    },

    render() {
        return(
            <View style={styles.Search}>
                <Form ref="form" type={UserCredentials}/>

                <View style={styles.loginButtonContainer}>
                    <Button style={styles.loginButton} textStyle={styles.loginText}
                            onPress={this.login}>
                        { I18n.t('login')}
                    </Button>
                </View>
                <View style={styles.loginButtonContainer}>
                    <Text>
                        か
                    </Text>
                </View>
                <View style={styles.loginButtonContainer}>
                    <Button style={styles.registerButton} textStyle={styles.registerText}
                            onPress={this.register}>
                        { I18n.t('register')}
                    </Button>
                </View>
                <Popup ref={(popup) => { this.popup = popup }}/>
            </View>
        );
    }
});

module.exports = Login;