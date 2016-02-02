/**
 * Created by sebastian 29/01/16.
 */

var apiConsts  = require('../../constants/api').apiConsts;
var ImageUploadSubject = require('../../services/Streams').getStream('ImageUpload');

var uploadEndPoint = apiConsts.imageCloudServer  + 'upload/';

var api  = {
    async uploadImage(params) {
        try {
            console.warn(uploadEndPoint);
            let response = await fetch(uploadEndPoint,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({file: params.uri })
                });
            console.warn(JSON.stringify(response));
            ImageUploadSubject.onNext({type: 'uploadImage', data: JSON.parse(response._bodyInit)})
        } catch(error){
            console.warn(error);
        }
    }
}

module.exports = api;