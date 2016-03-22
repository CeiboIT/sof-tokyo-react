var React = require('react-native'), 
    t = require('tcomb-form-native'),
    I18nService = require('../../i18n'),
    I18n = I18nService.getTranslations(),
    Icon = require('react-native-vector-icons/FontAwesome'),
    ImageUploader = require('../../components/images/ImageUploader'),
    api = require('../../utils/api/ImageUploadApi');

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

    getValues() {
        var formValues = this.refs.form.getValues();
        
        this.state.post.title = formValues.title;
        this.state.post.content = formValues.description;

        console.warn('CreateNewPost > getValues ', JSON.stringify(this.state));
        return this.state.post;
    },

    setCategory() {
        var Nav = require("../../services/NavigationManager").getStream();
        Nav.onNext({path: 'createNewPostCategory', params: {newPost: this.getValues() }});
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
            <ScrollView style={{flex:1}}>

                <Form ref="form">
                    <TextInput style={{height: 60}}
                               name='title'
                               placeholder={I18n.t('title')}/>
                    <TextInput style={{height: 60}}
                               name="description"
                               placeholder={I18n.t('description')}/>
                </Form>

                <View style={{paddingHorizontal: 10}}>
                    <View style={styles.mainPhotoContainer}>
                        <TouchableHighlight onPress={() => { this.openPicker('post', 'img') }} underlayColor={'transparent'} style={styles.mainPhoto}>
                            <Image style={{width:200, height: 200}}
                                source={{uri: this.state.post.img}} resizeMode="stretch" />
                        </TouchableHighlight>
                    </View>
                    <Button onPress={() => { this.openPicker('post', 'subImg1') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>
                    <Button onPress={() => { this.openPicker('post', 'subImg2') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>
                    <Button onPress={() => { this.openPicker('post', 'subImg3') }}>
                        <Text>{I18n.t('select_image')}</Text>
                    </Button>

                    <Button onPress={this.setCategory}>
                        {I18n.t('set_category')} <Icon name="angle-double-right" style={styles.iconPlus}/>
                    </Button>
                </View>
                <View>
                    <Popup ref={(popup) => { this.popup = popup }}/>
                </View>
            </ScrollView>)
    }
});

module.exports = CreateNewPost;