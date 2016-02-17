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
var api = require("../utils/api/UserApi");
var schoolApi = require('../utils/api/SchoolsApi');
var I18nService = require('../i18n');
var SchoolsStream = require('../services/Streams').getStream('Schools');

I18nService.set('ja-JP', {
        'registerWithFacebook': 'Facebookで始める',
        'registerUsername': 'ユーザー名 (必須)',
        'registerMail': 'メールアドレス (必須)',
        'registerDisplayName': '表示ユーザー名	(必須)',
        'registerOk': 'Register successful, please check your email to finish the process',
        'ok': 'ok',
        'register_error_000': 'Email already exists, please choose another',
        'register_error_001': 'Username already exists, please choose another',
        'country': '現在地',
        'obog': 'OB・OG',
        'school': '所属'
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

let Countries = [ {text: 'Japan', value: 'JAPAN'},
    {text: 'US', value: 'US'},
    {text: 'Euro', value: 'EURO'},
    {text: 'Other', value: 'OTHER'}];

let OB_OG = [{ text: 'OB', value: 'OB'}, { text: 'OG', value: 'OG' }];

var Register  = React.createClass({

    componentDidMount() {
        schoolApi.LoadSchools();
        SchoolsStream.subscribe((results) => {
            console.warn('componentDidMount > schools', JSON.stringify(results));
            this.setState({schools: results.schools});
        });
    },

    getInitialState() {
        return {
            showCountry: false,
            showObog: false,
            showSchool: false,
            swipeToClose: false,
            schools: [],
            country: 'JAPAN'
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

    getRegisterValues() {
        var registerValues = this.refs.form.getValues();
        registerValues.country = this.state.country;
        registerValues.obog = this.state.obog;
        registerValues.school = this.state.school;
        console.warn('registerValues > ', JSON.stringify(registerValues));
        return registerValues;
    },

    register(values) {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        console.warn('refs', JSON.stringify(this.refs.form.getValues()));
        var _data = this.getRegisterValues();
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

    toggleCountry() {
        this.setState({showCountry: !this.state.showCountry});
    },

    toggleObog() {
        this.setState({showObog: !this.state.showObog});
    },

    toggleSchool() {
        this.setState({showSchool: !this.state.showSchool});
    },

    showCountry() {
        if (this

                .state.showCountry) {
            return (<Picker
                selectedValue={this.state.country}
                onValueChange={(country) => this.setState({country: country})}>
                {Countries.map((country) => (
                    <PickerItem
                        key={country}
                        value={country.value}
                        label={country.text}
                    />
                ))}
            </Picker>);
        }
    },

    showObog() {
        if (this.state.showObog) {
            return (<Picker
            selectedValue={this.state.obog}
            onValueChange={(obog) => this.setState({obog: obog})}>
            {OB_OG.map((obog) => (
                <PickerItem
                    key={obog}
                    value={obog.value}
                    label={obog.text}
                />
            ))}
        </Picker>
        );
        }
    },

    showSchool() {
        if (this.state.showSchool) {
            return (<Picker
                    selectedValue={this.state.school}
                    onValueChange={(school) => this.setState({school: school})}>
                    {this.state.schools.map((school) => (
                        <PickerItem
                            key={school}
                            value={school.value}
                            label={school.value}
                        />
                    ))}
                </Picker>
            );
        }
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

                    <Form ref="form">
                        <TextInput style={{height: 60}} name="username" placeholder="Username"/>
                        <TextInput style={{height: 60}} name="email" placeholder="Email"/>
                        <TextInput style={{height: 60}} name="display_name" placeholder="Display name"/>
                        <TextInput style={{height: 60}} name="years" placeholder="Age"/>
                    </Form>
                    <Text style={{height: 60, textDecorationLine: 'underline'}}
                          onPress={this.toggleCountry}>
                        Country: <Text> {this.state.country} </Text>
                    </Text>
                    {this.showCountry()}

                    <Text style={{height: 60}}
                          onPress={this.toggleObog}>
                        Obog: <Text> {this.state.obog} </Text>
                    </Text>
                    {this.showObog()}

                    <Text style={{height: 60}}
                          onPress={this.toggleSchool}>
                        School: <Text> {this.state.school} </Text>
                    </Text>
                    {this.showSchool()}

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
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
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