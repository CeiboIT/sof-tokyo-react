/**
 * Created by sebastian 29/01/16.
 */

var apiConsts  = require('../../constants/api').apiConsts;
var ErrorSubject = require('../../services/Streams').getStream('Errors');
var ImageUploadSubject = require('../../services/Streams').getStream('ImageUpload');

var uploadEndPoint = apiConsts.imageCloudServer  + 'upload/';

var api  = {

    async uploadImage(params) {
        try {
            console.warn(uploadEndPoint);
            console.warn(JSON.stringify(params.uri));
            let response = await fetch(uploadEndPoint,
            {
                'method': 'POST',
                'Content-Type': 'application/json',
                'body': ''//encodeURIComponent(params.uri)
            });
            ImageUploadSubject.onNext({type: 'uploadImage', data: JSON.parse(response)})
        } catch(error){
            console.warn(error);
        }
    }
}

module.exports = api;