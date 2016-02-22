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

I18nService.set('ja-JP', {
    'title': '作品のタイトル',
    'description': '作品の説明',
    'select_image': 'Select an image',
    'newPost_error_000': 'Error uploading image',
    'set_category': 'Set category'
});

var {
    View,
    Image,
    StyleSheet,
    TextInput,
    } = React;

var NewPostForm = t.struct({
    title: t.String,
    description: t.String
});

var CreateNewPost = React.createClass({

    getInitialState() {
        return {
            selectedImage: {},
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

    openPicker() {
        ImageUploader.openPicker()
        .then((response) => {
            console.warn('CreanteNewPost > openPicker ' , JSON.stringify(response));
            if (response.source) {
                this.setState({selectedImage: response.source});
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
                    <Button onPress={this.openPicker}>
                        {I18n.t('select_image')}
                    </Button>
                </View>

                <View>
                    <Image source={this.state.selectedImage} style={styles.base} />
                </View>

                <Button onPress={this.setCategory}>
                    {I18n.t('set_category')}
                </Button>

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