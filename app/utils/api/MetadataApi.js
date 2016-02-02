/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiConsts  = require("../../constants/api").apiConsts;
var metadataStream = require("../../services/Streams").getStream("Metadata");
var metadataEndpoint = apiConsts.apiEndpoint + 'metadata/';

var api = {
    async StylesList(){
        try {
            let response = await fetch(metadataEndpoint + 'styles/list');
            metadataStream.onNext(({data: JSON.parse(response._bodyInit)['styles'], type:'styles'}))
        } catch(error){
            console.warn(error);
        }
    }
};

module.exports = api;
