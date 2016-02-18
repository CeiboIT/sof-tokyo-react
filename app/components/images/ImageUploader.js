
var I18n = I18nService.getTranslations();
var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var imageUploadApi = require('../utils/api/ImageUploadApi');
var imageUploadStream = require('../services/Streams').getStream("ImageUpload");

var ImageUploader = React.createClass({

    openPicker() {
        return new Promise((resolve, reject) => {
            UIImagePickerManager.launchImageLibrary(options, (response) => {
                console.warn('Response = ', response);
                if (response.didCancel) {
                    console.warn('User cancelled image picker');
                    reject({cause: 'cancel'});
                }
                else if (response.error) {
                    console.warn('UIImagePickerManager Error: ', response.error);
                    reject({cause: response.error, code: '000'});
                }
                else {
                    // You can display the image using either data:
                    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    resolve({source: source});
                }
            });
        });
    }
});

module.exports = ImageUploader;