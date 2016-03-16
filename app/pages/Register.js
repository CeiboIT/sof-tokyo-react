import Button from 'apsl-react-native-button';
import Popup from 'react-native-popup';

var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowsSize = Dimensions.get('window'),
    api = require("../utils/api/UserApi"),
    schoolApi = require('../utils/api/SchoolsApi'),
    I18nService = require('../i18n'),
    SchoolsStream = require('../services/Streams').getStream('Schools'),
    {GiftedForm, GiftedFormManager} = require('react-native-gifted-form'),
    moment = require('moment');

I18nService.set('ja-JP', {
        'registerWithFacebook': 'Facebookで始める',
        'registerUsername': 'ユーザー名',
        'registerMail': 'メールアドレス',
        'registerDisplayName': '表示ユーザー名',
        'registerOk': '登録は官僚しました。メールアドレスの確認して下さい',
        'ok': 'OK',
        'register_error_000': 'このメールアドレスは他のユーザーが使っています',
        'register_error_001': 'このユーザー名は他のユーザーが使っています',
        'years': '年齢',
        'country': '現在地',
        'school': '所属',
        'obog': 'OB・OG',
        'or' : 'か',
        'login' : 'ログイン',
        'register': '登録 '
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

var styles = StyleSheet.create({
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
            showGender: false,
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

    register(values) {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        var _data = values;
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
    
    toggleGender() {
        this.setState({showGender: !this.state.showGender});
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
        if (this.state.showCountry) {
            return (
                    <GiftedForm.SelectWidget name='country' title='Country' multiple={false}>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/flags/jp.png')} title='Japan' value='JAPAN' style={{paddingLeft:15}}/>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/flags/us.png')} title='US' value='US' style={{paddingLeft:15}}/>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/passport.png')} title='Euro' value='EURO' style={{paddingLeft:15}}/>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/passport.png')} title='Other' value='OTHER' style={{paddingLeft:15}}/>
                        <GiftedForm.SeparatorWidget />
                    </GiftedForm.SelectWidget>
            );
        }
    },

    showObog() {
        if (this.state.showObog) {
            return (
                    <GiftedForm.SelectWidget name='obog' title='Obog' multiple={false}>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/book.png')} title='OB' value='OB' style={{paddingLeft:15}}/>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/book.png')} title='OG' value='OG' style={{paddingLeft:15}}/>
                        <GiftedForm.SeparatorWidget />
                    </GiftedForm.SelectWidget>
            );
        }
    },
    showGender() {
        if (this.state.showGender) {
            return (
                    <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/female.png')} title='Female' value='female' style={{paddingLeft:15}}/>
                        <GiftedForm.OptionWidget image={require('../../assets/icons/color/male.png')} title='Male' value='male' style={{paddingLeft:15}}/>
                        <GiftedForm.SeparatorWidget />
                    </GiftedForm.SelectWidget>
            );
        }
    },

    showSchool() {
        if (this.state.showSchool) {
            return (
                    <GiftedForm.SelectWidget name='school' title='School' multiple={false}>
                    {
                        this.state.schools.map((school) => (
                            <GiftedForm.OptionWidget key={school.value} image={require('../../assets/icons/color/book.png')} title={school.value} value={school.value} style={{paddingLeft:15}}/>
                        ))
                    }
                        <GiftedForm.SeparatorWidget />
                    </GiftedForm.SelectWidget>
            );
        }
    },
    render() {
        return(
            <GiftedForm
                formName='signupForm' // GiftedForm instances that use the same name will also share the same states

                openModal={ (route) => {
                    
                }}

                clearOnClose={false} // delete the values of the form when unmounted

                defaults={{
                    /*
                    username: 'Farid',
                    'gender{M}': true,
                    password: 'abcdefg',
                    country: 'FR',
                    birthday: new Date(((new Date()).getFullYear() - 18)+''),
                    */
                }}

                validators={{
                username: {
                    title: 'Username',
                    validate: [{
                    validator: 'isLength',
                    arguments: [3, 16],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    },{
                    validator: 'matches',
                    arguments: /^[a-zA-Z0-9]*$/,
                    message: '{TITLE} can contains only alphanumeric characters'
                    }]
                },
                email: {
                    title: 'Email address',
                    validate: [{
                    validator: 'isLength',
                    arguments: [6, 255],
                    },{
                    validator: 'isEmail',
                    }]
                },
                display_name: {
                    title: 'Display name',
                    validate: [{
                    validator: 'isLength',
                    arguments: [1, 23],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
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
                years : {
                    title: 'Years',
                    validate: [{
                        validator: 'isInt',
                    },{
                        validator: 'isLength',
                        arguments: [1, 2],
                        message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    }]
                },
                country: {
                    title: 'Country',
                    validate: [{
                    validator: (...args) => {
                        if (args[0] === undefined) {
                        return false;
                        }
                        return true;
                    },
                    message: '{TITLE} is required',
                    }]
                },
                school: {
                    title: 'School',
                    validate: [{
                    validator: (...args) => {
                        if (args[0] === undefined) {
                        return false;
                        }
                        return true;
                    },
                    message: '{TITLE} is required',
                    }]
                },
                obog: {
                    title: 'Obog',
                    validate: [{
                    validator: (...args) => {
                        if (args[0] === undefined) {
                        return false;
                        }
                        return true;
                    },
                    message: '{TITLE} is required',
                    }]
                },
                }}
            >

                <GiftedForm.SeparatorWidget />
                <GiftedForm.TextInputWidget
                    name='username'
                    title={ I18n.t('registerUsername')}
                    image={require('../../assets/icons/color/contact_card.png')}

                    placeholder='MarcoPolo'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.TextInputWidget
                    name='email' // mandatory
                    title={ I18n.t('registerMail')}
                    placeholder='example@nomads.ly'
                    keyboardType='email-address'
                    clearButtonMode='while-editing'
                    image={require('../../assets/icons/color/email.png')}
                />
                
                <GiftedForm.TextInputWidget
                    name='display_name' // mandatory
                    title={ I18n.t('registerDisplayName')}
                    image={require('../../assets/icons/color/user.png')}
                    placeholder='Marco Polo'
                    clearButtonMode='while-editing'
                />
                
                <GiftedForm.TextInputWidget
                    name='password' // mandatory
                    title='パスワードを選択'
                    placeholder='******'
                    clearButtonMode='while-editing'
                    secureTextEntry={true}
                    image={require('../../assets/icons/color/lock.png')}
                />

                <GiftedForm.SeparatorWidget />
                
                <GiftedForm.TextInputWidget
                    name='years' // mandatory
                    title={ I18n.t('years')}
                    placeholder='+18'
                    clearButtonMode='while-editing'
                    image={require('../../assets/icons/color/birthday.png')}
                />
                
                <GiftedForm.ModalWidget
                    title={ I18n.t('country')}
                    displayValue='country'
                    image={require('../../assets/icons/color/passport.png')}
                    onPress={this.toggleCountry}
                >
                </GiftedForm.ModalWidget>
                
                {this.showCountry()}
                
                <GiftedForm.ModalWidget
                    title={ I18n.t('school')}
                    displayValue='school'
                    image={require('../../assets/icons/color/book.png')}
                    onPress={this.toggleSchool}
                >
                </GiftedForm.ModalWidget>               
                {this.showSchool()}
                
                <GiftedForm.ModalWidget
                    title={ I18n.t('obog')}
                    displayValue='obog'
                    onPress={this.toggleObog}
                    image={require('../../assets/icons/color/book.png')}
                >
                </GiftedForm.ModalWidget>               
                {this.showObog()}

                <GiftedForm.SubmitWidget
                    title={ I18n.t('register')}
                    widgetStyles={{
                        submitButton: {
                        backgroundColor: '#34767F',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        if (isValid === true) {
                            this.register(values);
                            postSubmit();
                        }
                    }}
                />
                
                <View style={styles.or}>
                    <Text>{ I18n.t('or')}</Text>
                </View>
                
                <View>
                    <Button style={styles.button} textStyle={styles.textButton} onPress={this.login}>
                            { I18n.t('login')}
                    </Button>
                </View>  
            
                <GiftedForm.NoticeWidget 
                    title='By signing up, you agree to the Terms of Service and Privacy Policity.'
                />

            </GiftedForm>
        );
    }
});

module.exports = Register;