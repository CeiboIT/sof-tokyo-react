/**
 * Created by seba on 17/02/16.
 */
import Form from 'react-native-form'
import Popup from 'react-native-popup';
import Button from 'apsl-react-native-button'

var I18nService = require('../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var ImageUploader = require('../components/images/ImageUploader');

I18nService.set('ja-JP', {
    'title': '作品のタイトル',
    'description': '作品の説明',
    'select_image': 'Select an image',
    'newPost_error_000': 'Error uploading image'
});

var {
    View,
    Image,
    StyleSheet,
    TextInput,
    } = React;

var NewPost = React.createClass({

    getInitialState() {
        return {
            selectedImage: {},
            uploadImageResponse: 'not yet'
        }
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
        return (<View style={styles.Search}>
                    <Form ref="from">
                        <TextInput style={{height: 60}}
                                   name='title'
                                   placeholder={I18n.t('title')}/>
                        <TextInput style={{height: 60}}
                                   name="description"
                                   placeholder={I18n.t('description')}/>
                    </Form>
                    <Button style={styles.button}
                            textStyle={styles.loginText}
                            onPress={this.openPicker}>
                        {I18n.t('select_image')}
                    </Button>

                    <Image source={this.state.selectedImage} style={styles.base} />

                    <View>
                        <Popup ref={(popup) => { this.popup = popup }}/>
                    </View>
                </View>)
    }
});

var styles = StyleSheet.create({
    Search: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    base: {
        width: 60,
        height: 60
    }
});

module.exports = NewPost;

/*<Button style={styles.button} textStyle={styles.loginText}
 onPress={this.uploadImage}>
 Send to cloudinary
 </Button> */

/*
 <Form ref="form">
 <TextInput style={{height: 60}}
 name="title"
 placeholder={I18n.t('title')}/>
 <TextInput style={{height: 60}}
 name="description"
 placeholder={I18n.t('description')}/>
 </Form>

 <Button style={styles.button} textStyle={styles.loginText}
 onPress={this.openPicker}>
 {I18n.t('select_image')}
 </Button>

 <Image source={this.state.selectedImage} style={styles.base} />

 <Popup ref={(popup) => { this.popup = popup }}/>
 */