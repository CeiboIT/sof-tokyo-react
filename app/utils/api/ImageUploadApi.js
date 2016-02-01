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
            console.warn(JSON.stringify(params.uri));
            let response = await fetch(uploadEndPoint,
            {
                'method': 'POST',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'body': params.uri
            }).catch(function (err) {
                console.warn('fetch error')
                console.warn(err);
            });
            //ImageUploadSubject.onNext({type: 'uploadImage', data: JSON.parse(response)})
        } catch(error){
            console.warn('try cathc error', error);
        }
    }
}

module.exports = api;