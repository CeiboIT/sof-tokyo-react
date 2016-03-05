/**
 * Created by seba on 17/02/16.
 */
import Popup from 'react-native-popup';
import Button from 'apsl-react-native-button'
import Form from 'react-native-form';

var t = require('tcomb-form-native');
var I18nService = require('../../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var ImageUploader = require('../../components/images/ImageUploader');
var api = require('../../utils/api/ImageUploadApi');

I18nService.set('ja-JP', {
    'title': '作品のタイトル',
    'description': '作品の説明',
    'main_photo': 'メイン画像',
    'sub_photos': 'サブ画像',
    'newPost_error_000': 'Error uploading image',
    'set_category': 'Set category'
});

var {
    View,
    Image,
    StyleSheet,
    TextInput,
    Text
    } = React;

var NewPostForm = t.struct({
    title: t.String,
    description: t.String
});

var CreateNewPost = React.createClass({

    getInitialState() {
        return {
            post: {
                authorId: 0,
                title: '',
                content: '',
                img: '',
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

    getValues() {
        var newPost = this.refs.form.getValues();
        // validate all fields are filled
        newPost.image = this.state.selectedImage;
        console.warn('CreateNewPost > getValues ', JSON.stringify(newPost));
        return newPost;
    },

    setCategory() {
        console.warn('setCategory');
        var Nav = require("../../services/NavigationManager").getStream();
        Nav.onNext({path: 'createNewPostCategory', params: {newPost: {hola: 'chau'} }});
    },

    openPicker(object, key) {
        ImageUploader.openPicker()
        .then((response) => {
            console.warn('CreanteNewPost > openPicker ' , JSON.stringify(response));
            if (response.source) {
                this.setState({ [object] :
                    {
                     [key] : response.source
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
            <View style={{flex:1}}>

                <Form ref="form">
                    <TextInput style={{height: 60}}
                               name='title'
                               placeholder={I18n.t('title')}/>
                    <TextInput style={{height: 60}}
                               name="description"
                               placeholder={I18n.t('description')}/>
                </Form>

                <View>
                    <Button onPress={() => { this.openPicker('post', 'img') }}>
                        <Text>Main photo</Text>
                    </Button>
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

                <View>

                </View>

                <Button onPress={this.setCategory}>
                    {I18n.t('set_category')}
                </Button>
                <View>
                    <Button>
                        Next
                    </Button>
                </View>

                <View>
                    <Popup ref={(popup) => { this.popup = popup }}/>
                </View>
            </View>)
    }
});

var styles = StyleSheet.create({
    base: {
        width: 90,
        height: 90
    }
});

/*
 <TextInput style={{height: 60}}
 name='title'
 placeholder={I18n.t('title')}/>
 <TextInput style={{height: 60}}
 name="description"
 placeholder={I18n.t('description')}/>
 */
module.exports = CreateNewPost;