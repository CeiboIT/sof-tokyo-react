/**
 * Created by sebastian on 29/01/16.
 */


var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var imageUploadApi = require('../utils/api/ImageUploadApi');
var imageUploadStream = require('../services/Streams').getStream("ImageUpload");

import Button from 'apsl-react-native-button'

var {
    View,
    Text,
    StyleSheet,
    Image
    } = React

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    },
    base: {
        width: 60,
        height: 60
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
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
})

var options = {
    title: '', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: '', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: '', // specify null or empty string to remove this button
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    maxWidth: 100, // photos only
    maxHeight: 100, // photos only
    quality: 0.2, // photos only
    angle: 0, // photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
    }
};


var UpoloadImage = React.createClass({

    getInitialState() {
        return {
            selectedImage: {},
            uploadImageResponse: 'not yet'
        }
    },

    uploadImage () {
        var params = this.state.selectedImage;
        imageUploadApi.uploadImage(params)
        imageUploadStream.subscribe((results) => {
            console.warn('response from upload', JSON.stringify(results.data));
            console.warn('public id', results.data.public_id);
            this.setState({
                uploadImageResponse: results.data.public_id
            });
        })

    },

    openPicker() {    // Open Image Library:
        UIImagePickerManager.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('UIImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                this.setState({
                    selectedImage: source
                });
            }
        });
    },

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Upload image
                </Text>
                <Button style={styles.button} textStyle={styles.loginText}
                        onPress={this.openPicker}>
                    Select image
                </Button>
                <Image source={this.state.selectedImage} style={styles.base} />
                <Button style={styles.button} textStyle={styles.loginText}
                        onPress={this.uploadImage}>
                    Send to cloudinary
                </Button>
                <Text>
                    publicId: {this.state.uploadImageResponse}
                </Text>
            </View>
        )
    }
})

module.exports= UpoloadImage

