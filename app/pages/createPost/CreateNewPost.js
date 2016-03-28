var React = require('react-native'), 
    t = require('tcomb-form-native'),
    I18nService = require('../../i18n'),
    I18n = I18nService.getTranslations(),
    Icon = require('react-native-vector-icons/FontAwesome'),
    ImageUploader = require('../../components/images/ImageUploader'),
    api = require('../../utils/api/ImageUploadApi'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window"),
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

var subPhotoSize = {
    height: windowSize.width * 0.3,
    width: windowSize.width * 0.45,
}

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
        height: windowSize.width * 0.5,
        width: windowSize.width * 0.5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F7F7F7',
        borderColor: 'grey',
        borderStyle: 'dashed',
        marginVertical: 15
    },
    mainPhotoText : {
        color: '#969696',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subPhotos : {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around',
        paddingHorizontal:10
    },
    subPhoto : {
        justifyContent: 'center',
        alignItems: 'center',
        height: subPhotoSize.height,
        width: subPhotoSize.width,
        backgroundColor: '#F7F7F7',
        borderColor: 'grey',
        marginVertical:5
    },
    subPhotoImage : {
        height: subPhotoSize.height,
        width: subPhotoSize.height,
    },
    subPhotoText : {
        color: '#969696'
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
            //console.warn('CreanteNewPost > openPicker ' , JSON.stringify(response));
            if (response.source) {
                this.state[object][key] = response.source.uri;
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
    hola() {
        var _label = <Text style={styles.mainPhotoText}>ADD IMAGE</Text>
            
            _render = (this.state.post.img) ? '' : _label;
            
      return _render 
    },
    render() {
        return (
                <GiftedForm
                    formName='createForm'
                    clearOnClose={false}
                    defaults={{
                    
                    }}
                    style={{backgroundColor:'#FFFFFF'}}
                    validators={{
                        title: {
                            title: '作品のタイトル',
                            validate: [{
                                validator: 'isLength',
                                arguments: [3, 50],
                                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                            }]
                        },
                        description: {
                            title: '作品の説明',
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
                        <View>
                            {this.hola()}
                            <Image style={{width:200, height: 200}} source={{uri: this.state.post.img}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                </View>
                <View style={styles.subPhotos}>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg1') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像１</Text>
                            <Image style={{width:subPhotoSize.width, height: subPhotoSize.height}} source={{uri: this.state.post.subImg1}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg2') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像２</Text>
                            <Image source={{uri: this.state.post.subImg2}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg3') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像３</Text>
                            <Image source={{uri: this.state.post.subImg3}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg4') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像４</Text>
                            <Image source={{uri: this.state.post.subImg4}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg5') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像５</Text>
                            <Image source={{uri: this.state.post.subImg5}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg6') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像６</Text>
                            <Image source={{uri: this.state.post.subImg6}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg7') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像７</Text>
                            <Image source={{uri: this.state.post.subImg7}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg8') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像８</Text>
                            <Image source={{uri: this.state.post.subImg8}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.openPicker('post', 'subImg9') }} underlayColor={'transparent'} style={styles.subPhoto}>
                        <View>
                            <Text style={styles.subPhotoText}>サブ画像９</Text>
                            <Image source={{uri: this.state.post.subImg9}} resizeMode="stretch" />                          
                        </View>                                    
                    </TouchableHighlight>
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

// <Button onPress={() => { this.openPicker('post', 'subImg1') }}>
//                         <Text>{I18n.t('select_image')}</Text>
//                     </Button>
//                     <Button onPress={() => { this.openPicker('post', 'subImg2') }}>
//                         <Text>{I18n.t('select_image')}</Text>
//                     </Button>
//                     <Button onPress={() => { this.openPicker('post', 'subImg3') }}>
//                         <Text>{I18n.t('select_image')}</Text>
//                     </Button>