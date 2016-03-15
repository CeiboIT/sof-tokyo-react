var React = require('react-native'),
    Dimensions= require('Dimensions'),
    windowsSize = Dimensions.get('window'),
    Button = require('apsl-react-native-button'),
    api =require("../utils/api/UserApi"),
    t = require('tcomb-form-native'),
    I18nService = require('../i18n'),
    Icon = require('react-native-vector-icons/FontAwesome'),
    UserSubject = require("../services/Streams").getStream("User"),
    AuthSubject= require("../services/Streams").getStream("Auth"),
    {GiftedForm, GiftedFormManager} = require('react-native-gifted-form'),
    moment = require('moment');

import Popup from 'react-native-popup';

I18nService.set('ja-JP', {
        'login' : 'ログイン',
        'loginWithFacebook': 'Facebookで始める',
        'register': '登録 ',
        'error_login_100': 'ユーザー名かパスワードが無効です',
        'or' : 'か'
    }
);

var I18n = I18nService.getTranslations();

var {
    View,
    Text,
    StyleSheet
    } = React;

var styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column'
    },
    button : {
        margin: 10,
        backgroundColor: '#00b9f7',
        borderWidth: 0,
        borderRadius: 0,
        height: 40
    },
    textButton : {
        color: 'white',
        fontSize: 15,
    },
    or : {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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

    login(credentials){
        var _credentials = credentials;
        if(_credentials) {
            api.sendCredentials(_credentials);
            UserSubject.subscribe((response)=>{
                console.warn('Login > login ', JSON.stringify(response));
                if (response.type === 'login') {
                    if (!response.data.error) {
                        AuthSubject.onNext({type: 'login', success : true});
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
            <GiftedForm
                formName='loginForm' // GiftedForm instances that use the same name will also share the same states

                clearOnClose={false} // delete the values of the form when unmounted

                defaults={{

                }}

                validators={{
                username: {
                    title: 'Username',
                    validate: [{
                    validator: 'isLength',
                    arguments: [3, 24],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    },{
                    validator: 'matches',
                    arguments: /^[a-zA-Z0-9]*$/,
                    message: '{TITLE} can contains only alphanumeric characters'
                    }]
                },
                password: {
                    title: 'Password',
                    validate: [{
                    validator: 'isLength',
                    arguments: [6, 16],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    }]
                },
                }}
          >
          
          <GiftedForm.TextInputWidget
              name='username'
              title='Username'
              image={require('../../assets/icons/color/contact_card.png')}

              placeholder='MarcoPolo'
              clearButtonMode='while-editing'
            />

            <GiftedForm.TextInputWidget
              name='password' // mandatory
              title='Password'

              placeholder='******'


              clearButtonMode='while-editing'
              secureTextEntry={true}
              image={require('../../assets/icons/color/lock.png')}
            />

            <GiftedForm.SeparatorWidget />

            <GiftedForm.SubmitWidget
              title={ I18n.t('login')}
              widgetStyles={{
                submitButton: {
                  backgroundColor: '#34767F',
                }
              }}
              onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                if (isValid === true) {
                  // prepare object

                  /* Implement the request to your server using values variable
                  ** then you can do:
                  ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                  ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                  ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                  */
                  this.login(values);
                  postSubmit();
                }
              }}

            />
            
            <View style={styles.or}>
                <Text>{ I18n.t('or')}</Text>
            </View>
            
            <View>
                <Button style={styles.button} textStyle={styles.textButton} onPress={this.register}>
                        { I18n.t('register')}
                </Button>
            </View>            

          </GiftedForm>
            
        );
    }
});

module.exports = Login;

// <View style={styles.Search}>
//                 <Form ref="form" type={UserCredentials}/>

//                 <View style={styles.loginButtonContainer}>
//                     <Button style={styles.loginButton} textStyle={styles.loginText}
//                             onPress={this.login}>
//                         { I18n.t('login')}
//                     </Button>
//                 </View>
//                 <View style={styles.loginButtonContainer}>
//                     <Text>
//                         か
//                     </Text>
//                 </View>
//                 <View style={styles.loginButtonContainer}>
//                     <Button style={styles.registerButton} textStyle={styles.registerText}
//                             onPress={this.register}>
//                         { I18n.t('register')}
//                     </Button>
//                 </View>
//                 <Popup ref={(popup) => { this.popup = popup }}/>
//             </View>