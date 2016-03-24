var React = require('react-native'), 
    t = require('tcomb-form-native'),
    I18nService = require('../../i18n'),
    I18n = I18nService.getTranslations(),
    Icon = require('react-native-vector-icons/FontAwesome'),
    ImageUploader = require('../../components/images/ImageUploader'),
    api = require('../../utils/api/ImageUploadApi'),
    {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');
    
import Popup from 'react-native-popup';
import Button from 'apsl-react-native-button';
import Form from 'react-native-form';

I18nService.set('ja-JP', {
    'title': '作品のタイトル',
    'description': '作品の説明',
    'main_photo': 'メイン画像',
    'sub_photos': 'サブ画像',
    'newPost_error_000': 'Error uploading image',
    'set_category': 'Set category',
    'select_image' : 'select image'
});

var {
    View,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    Text,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    base: {
        width: 90,
        height: 90
    },
    mainPhotoContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainPhoto : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        borderStyle: 'dashed',
        marginVertical: 15
    },
    mainPhotoText : {
        color: 'grey',
        fontSize: 15  
    }
});

var NewPostForm = t.struct({
    title: t.String,
    description: t.String
});

var CreateNewPost = React.createClass({

    getInitialState() {
        return {
            post: {
                authorId: 1,
                title: '',
                content: '',
                img: 'https://placeholdit.imgix.net/~text?txtsize=34&txt=add+image&w=200&h=200',
                subcategory0: '',
                subcategory1: '',
                styles: [],
                sex: '',
                subImg1: '',
                subImg2: '',
                subImg3: '',
                subImg4: '',
                subImg5: '',
                subImg6: '',
                subImg7: '',
                subImg8: '',
                subImg9: '',
                productionCost: 0,
                sell: '',
                sellPrice: 0,
                sellNote: '',
                rental: '',
                rentalPrice: 0,
                rentalNote: ''
            },
            uploadImageResponse: 'not yet'
        }
    },

    setCategory(values) {
        var post = this.state.post,
            Nav = require("../../services/NavigationManager").getStream();
            
        post.title = values.title;
        post.content = values.description;
        
        Nav.onNext({path: 'createNewPostCategory', params: {newPost: post }});
    },

    openPicker(object, key) {
        ImageUploader.openPicker()
        .then((response) => {
            console.warn('CreanteNewPost > openPicker ' , JSON.stringify(response));
            if (response.source) {
                this.setState({ [object] :
                    {
                     [key] : response.source.uri
                    }
                });
            }
            // else: user cancel picker dialog.
        })
        .catch((error) => {
            this.popup.alert(I18n.t('newPost_error_' + error.code));
        });
    },

    render() {
        return (
                <GiftedForm
                    formName='createForm'
                    clearOnClose={false}
                    defaults={{
                    
                    }}
                    validators={{
                        title: {
                            title: 'Title',
                            validate: [{
                                validator: 'isLength',
                                arguments: [3, 50],
                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                            }]
                        },
                        description: {
                            title: 'Description',
                                validate: [{
                                validator: 'isLength',
                                arguments: [2, 512],
                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                            }]
                        }
                    }}
                >
                <GiftedForm.SeparatorWidget />
                
                <GiftedForm.TextInputWidget
                    name='title'
                    title={I18n.t('title')}
                    image={require('../../../assets/icons/color/contact_card.png')}
                    placeholder={I18n.t('title')}
                    clearButtonMode='while-editing'
                />
                
                <GiftedForm.TextAreaWidget
                    name='description'
                    title={I18n.t('description')}
                    placeholder={I18n.t('description')}
                    clearButtonMode='while-editing'
                />
            
                <GiftedForm.SeparatorWidget />       
                
                <View style={styles.mainPhotoContainer}>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'img') }} underlayColor={'transparent'} style={styles.mainPhoto}>
                        <Image style={{width:200, height: 200}}
                               source={{uri: this.state.post.img}} resizeMode="stretch" />
                    </TouchableHighlight>
                </View>
                <View style={{paddingHorizontal:10}}>
                    <Button onPress={() => { this.openPicker('post', 'subImg1') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>
                    <Button onPress={() => { this.openPicker('post', 'subImg2') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>
                    <Button onPress={() => { this.openPicker('post', 'subImg3') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>
                </View>
                    
                    <GiftedForm.SubmitWidget
                        title={I18n.t('set_category')}
                        widgetStyles={{
                            submitButton: {
                            backgroundColor: '#34767F',
                            }
                        }}
                        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                            if (isValid === true) {
                                this.setCategory(values);
                                postSubmit();
                            }
                        }}
                    />
                
                <View>
                    <Popup ref={(popup) => { this.popup = popup }}/>
                </View>
                </GiftedForm>
            )
    }
});

module.exports = CreateNewPost;