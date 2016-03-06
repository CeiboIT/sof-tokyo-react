var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var options = {
    title: '', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: '', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: '', // specify null or empty string to remove this button
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    maxWidth: 500, // photos o
    // nly
    maxHeight: 500, // photos only
    quality: 0.9, // photos only
    angle: 0, // photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
    }
};

var ImageUploader = {

    openPicker: function () {
        return new Promise((resolve, reject) => {
            console.warn('ImageUploader > openPicker');

            UIImagePickerManager.launchImageLibrary(options, (response) => {
                console.warn('Response = ', response);
                if (response.didCancel) {
                    console.warn('User cancelled image picker');
                    reject({cause: 'cancel'});
                }
                else if (response.error) {
                    console.warn('UIImagePickerManager Error: ', response.error);
                    reject({cause: response.error, code: '000'});
                } else {
                    // You can display the image using either data:
                    const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                    resolve({source: source});
                }
            });
        }).catch((error) => {
            console.warn('ImageUploader > openPicker error ', JSON.stringify(error));
        });
    }
};

module.exports = ImageUploader;