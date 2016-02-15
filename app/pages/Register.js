/**
 * Created by epotignano on 12/01/16.
 */

import Button from 'apsl-react-native-button'
import Popup from 'react-native-popup';
import PickerAndroid from 'react-native-picker-android';
import Form from 'react-native-form';

var React = require('react-native');
var Dimensions= require('Dimensions');
var windowsSize = Dimensions.get('window');
var api =require("../utils/api/UserApi");
var I18nService = require('../i18n');

I18nService.set('ja-JP', {
        'registerWithFacebook': 'Facebookで始める',
        'registerUsername': 'ユーザー名 (必須)',
        'registerMail': 'メールアドレス (必須)',
        'registerDisplayName': '表示ユーザー名	(必須)',
        'registerOk': 'Register succesful, please check your email to finish the process',
        'ok': 'ok',
        'register_error_000': 'Email already exists, please choose another',
        'register_error_001': 'Username already exists, please choose another'
    }
);

var I18n = I18nService.getTranslations();

var {
    TextInput,
    Platform,
    PickerIOS,
    View,
	ScrollView,
    Text,
    StyleSheet
    } = React;


let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

let CAR_MAKES_AND_MODELS = [ {text: 'hola', value: 'h'}, {text: 'chau', value: 'c'}];

var Register  = React.createClass({
    getInitialState() {
        return {
            carMake: 'hola',
            modelIndex: 0,
        }
    },

    loginWithFacebook() {
        FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
            if (!error) {
                console.info("Login data: ", data);
            } else {
                console.info("Error: ", data);
            }
        })
    },

    register(values) {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        console.warn('refs', JSON.stringify(this.refs.form.getValues()));
        var _data = this.refs.form.getValues();
        if(_data) {
            api.registerNewUser(_data)
                .then(response => {
                    console.warn('Register > data ', JSON.stringify(response));
                    this.popup.tip({
                        title: I18n.t('register'),
                        content: I18n.t('registerOk'),
                        btn: {
                            text: I18n.t('ok'),
                            callback: () => {
                                NavigationSubject.onNext({ 'path': 'login' });
                            }
                        }
                    });
                })
                .catch(error => {
                    console.warn('Register > error ', JSON.stringify(error));
                    this.popup.alert(I18n.t('register_error_' + error.code));
                });
        }
    },

    login() {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        NavigationSubject.onNext({path: 'login'})
    },

    render() {
        return(
			<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1}}>
                <View style={styles.Search}>
                    <View style={styles.facebookContainer}>
                        <Button style={styles.facebookButton} textStyle={styles.facebookText} onPress={this.loginWithFacebook}>
                            { I18n.t('registerWithFacebook') }
                        </Button>
                    </View>
					<View>
                	
						<Form ref="form">
						    <TextInput style={{height: 60}} name="username" placeholder="Username"/>                   
                        	<TextInput style={{height: 60}} name="email" placeholder="Email"/>
                        	<TextInput style={{height: 60}} name="display_name" placeholder="Display name"/>
                        	<TextInput style={{height: 60}} name="years" placeholder="Age"/>
                    	</Form>
                        <Picker
                            selectedValue={this.state.carMake}
                            onValueChange={(carMake) => this.setState({carMake})}>
                            {CAR_MAKES_AND_MODELS.map((carMake) => (
                                <PickerItem
                                    key={carMake}
                                    value={carMake.value}
                                    label={carMake.text}
                                />
                            ))}
                        </Picker>
                    </View>

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
                    <Popup ref={(popup) => { this.popup = popup }}/>
                </View>
				</ScrollView>
        );
    }
});

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
    form: {
        paddingTop: 5,
        paddingBottom: 40
    },
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

module.exports = Register;

/*
 
 </ScrollView>


 <Form ref="form" type={UserCredentials} />

<TextInput name="username" placeholder="Username"/>
<TextInput name="email" placeholder="Email"/>
    <TextInput name="displayName" placeholder="Display name"/>
    <TextInput name="password" placeholder="Password"/>
    <TextInput name="age" placeholder="Age"/>
    <TextInput name="affiliation" placeholder="affiliantion"/>
*/