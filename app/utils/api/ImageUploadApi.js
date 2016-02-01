/**
 * Created by sebastian 29/01/16.
 */

var FormData = require('form-data');
var apiConsts  = require('../../constants/api').apiConsts;
var ErrorSubject = require('../../services/Streams').getStream('Errors');
var ImageUploadSubject = require('../../services/Streams').getStream('ImageUpload');

var uploadEndPoint = apiConsts.imageCloudServer  + 'upload/';

var api  = {

    async uploadImage(params) {
        try {
            console.warn(uploadEndPoint);
            console.warn(JSON.stringify(params.uri));
            var form = new FormData();
            form.append('file', encodeURIComponent(params.uri));
            form.submit(uploadEndPoint, function(err, res) {
                if (err) console.warn(err);
                console.warn('Done');
            });
            //let response = await fetch(uploadEndPoint,
            //{
            //    'method': 'POST',
            //    //'Content-Type': 'application/json',
            //    'body': form
            //});
            ImageUploadSubject.onNext({type: 'uploadImage', data: JSON.parse(response)})
        } catch(error){
            console.warn(error);
        }
    }
}

module.exports = api;