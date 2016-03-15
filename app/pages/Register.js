import Button from 'apsl-react-native-button'
import Popup from 'react-native-popup';
import PickerAndroid from 'react-native-picker-android';
import Form from 'react-native-form';

var React = require('react-native'),
    Dimensions= require('Dimensions'),
    windowsSize = Dimensions.get('window'),
    api = require("../utils/api/UserApi"),
    schoolApi = require('../utils/api/SchoolsApi'),
    I18nService = require('../i18n'),
    SchoolsStream = require('../services/Streams').getStream('Schools'),
    {GiftedForm, GiftedFormManager} = require('react-native-gifted-form'),
    moment = require('moment');

I18nService.set('ja-JP', {
        'registerWithFacebook': 'Facebookで始める',
        'registerUsername': 'ユーザー名 (必須)',
        'registerMail': 'メールアドレス (必須)',
        'registerDisplayName': '表示ユーザー名	(必須)',
        'registerOk': '登録は官僚しました。メールアドレスの確認して下さい',
        'ok': 'OK',
        'register_error_000': 'このメールアドレスは他のユーザーが使っています',
        'register_error_001': 'このユーザー名は他のユーザーが使っています',
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
    }
});

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
        if (this.state.showCountry) {
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
renderScene: function (route, navigator) {
//...
     if (route.giftedForm == true) {
          return route.renderScene();
     }
//...
},

configureScene: function (route) {
        //...
        if (route.giftedForm) {
            return route.configureScene();
        }
       //...
    },
    render() {
        return(
            <View>
            <Navigator
            ref="navigator"
            initialRoute={Routes.getInitialRoute()}
            renderScene={this.renderScene}
            configureScene={this.configureScene}
            navigationBar={this.setNavigationBar()}
        />
            <GiftedForm
                formName='signupForm' // GiftedForm instances that use the same name will also share the same states

                openModal={ (route) => {
                    route.giftedForm = true;
                    this.props.navigator.push(route); 
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
                bio: {
                    title: 'Biography',
                    validate: [{
                    validator: 'isLength',
                    arguments: [0, 512],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                    }]
                },
                gender: {
                    title: 'Gender',
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
                birthday: {
                    title: 'Birthday',
                    validate: [{
                    validator: 'isBefore',
                    arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
                    message: 'You must be at least 18 years old'
                    }, {
                    validator: 'isAfter',
                    arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
                    message: '{TITLE} is not valid'
                    }]
                },
                country: {
                    title: 'Country',
                    validate: [{
                    validator: 'isLength',
                    arguments: [2],
                    message: '{TITLE} is required'
                    }]
                },
                }}
            >

                <GiftedForm.SeparatorWidget />
                <GiftedForm.TextInputWidget
                    name='username'
                    title='Username'
                    image={require('../../assets/icons/color/contact_card.png')}

                    placeholder='MarcoPolo'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.TextInputWidget
                    name='email' // mandatory
                    title='Email address'
                    placeholder='example@nomads.ly'
                    keyboardType='email-address'
                    clearButtonMode='while-editing'
                    image={require('../../assets/icons/color/email.png')}
                />
                
                <GiftedForm.TextInputWidget
                    name='display_name' // mandatory
                    title='Display name'
                    image={require('../../assets/icons/color/user.png')}
                    placeholder='Marco Polo'
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

                <GiftedForm.ModalWidget
                title='Gender'
                displayValue='gender'
                image={require('../../assets/icons/color/gender.png')}
                >
                <GiftedForm.SeparatorWidget />

                <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
                    <GiftedForm.OptionWidget image={require('../../assets/icons/color/female.png')} title='Female' value='F'/>
                    <GiftedForm.OptionWidget image={require('../../assets/icons/color/male.png')} title='Male' value='M'/>
                </GiftedForm.SelectWidget>
                </GiftedForm.ModalWidget>

                <GiftedForm.ModalWidget
                    title='Birthday'
                    displayValue='birthday'
                    image={require('../../assets/icons/color/birthday.png')}

                scrollEnabled={false}
                >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.DatePickerIOSWidget
                    name='birthday'
                    mode='date'

                    getDefaultDate={() => {
                    return new Date(((new Date()).getFullYear() - 18)+'');
                    }}
                />
                </GiftedForm.ModalWidget>
                <GiftedForm.ModalWidget
                title='Country'
                displayValue='country'
                image={require('../../assets/icons/color/passport.png')}
                scrollEnabled={false}

                >
                <GiftedForm.SelectCountryWidget 
                    code='alpha2' 
                    name='country' 
                    title='Country' 
                    autoFocus={true}
                />
                </GiftedForm.ModalWidget>


                <GiftedForm.ModalWidget
                title='Biography'
                displayValue='bio'

                image={require('../../assets/icons/color/book.png')}

                scrollEnabled={true} // true by default
                >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget
                    name='bio'

                    autoFocus={true}

                    placeholder='Something interesting about yourself'
                />
                </GiftedForm.ModalWidget>



                <GiftedForm.SubmitWidget
                title='Sign up'
                widgetStyles={{
                    submitButton: {
                    backgroundColor: '#34767F',
                    }
                }}
                onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                    if (isValid === true) {
                    // prepare object
                    values.gender = values.gender[0];
                    values.birthday = moment(values.birthday).format('YYYY-MM-DD');

                    /* Implement the request to your server using values variable
                    ** then you can do:
                    ** postSubmit(); // disable the loader
                    ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
                    ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
                    ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
                    */
                    }
                }}

                />

                <GiftedForm.NoticeWidget 
                    title='By signing up, you agree to the Terms of Service and Privacy Policity.'
                />

            </GiftedForm>
        );
    }
});

module.exports = Register;

// <ScrollView keyboardShouldPersistTaps={true} style={{flex: 1}}>
//                 <View style={styles.Search}>
//                     <Form ref="form">
//                         <TextInput style={{height: 60}} name="username" placeholder="ユーサー名"/>
//                         <TextInput style={{height: 60}} name="email" placeholder="メールアドレス"/>
//                         <TextInput style={{height: 60}} name="display_name" placeholder="表示ユーザー名"/>
//                         <TextInput style={{height: 60}} name="years" placeholder="年齢"/>
//                     </Form>
//                     <View style={{padding:10, marginBottom: 20}}>
//                         <Text style={{height: 40, color: "#333"}}
//                             onPress={this.toggleCountry}>
//                             Country: <Text style={{color: "gray"}}> {this.state.country} </Text>
//                         </Text>
//                         {this.showCountry()}

//                         <Text style={{height: 40, color: "#333"}}
//                             onPress={this.toggleObog}>
//                             Obog: <Text style={{color: "gray"}}> {this.state.obog} </Text>
//                         </Text>
//                             {this.showObog()}

//                         <Text style={{height: 40, color: "#333"}}
//                             onPress={this.toggleSchool}>
//                             School: <Text style={{color: "gray"}}> {this.state.school} </Text>
//                         </Text>
//                             {this.showSchool()}
//                     </View>
//                     <View style={styles.loginButtonContainer}>
//                         <Button style={styles.loginButton} textStyle={styles.loginText}
//                                 onPress={this.register}>
//                             { I18n.t('register')}
//                         </Button>
//                     </View>
//                     <View style={styles.loginButtonContainer}>
//                         <Text>
//                             か
//                         </Text>
//                     </View>
//                     <View style={styles.loginButtonContainer}>
//                         <Button style={styles.registerButton} textStyle={styles.registerText}
//                                 onPress={this.login}>
//                             { I18n.t('login')}
//                         </Button>
//                     </View>
//                     <Popup ref={(popup) => { this.popup = popup }}/>
//                 </View>
//             </ScrollView>