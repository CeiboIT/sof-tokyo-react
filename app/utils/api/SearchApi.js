/**
 * Created by epotignano on 17/01/16.
 */

var apiConsts  = require("../../constants/api").apiConsts;
var ErrorSubject = require("../../services/Streams").getStream("Errors");
var SearchSubject = require("../../services/Streams").getStream("Search");

var api  = {
    async products(params, page) {
        try {
            let response = await fetch(apiConsts.apiEndpoint + 'products/search/' + params.text + '/' +(page || 1));
            SearchSubject.onNext({type: 'product', data: JSON.parse(response._bodyInit)})
        } catch(error){
            console.warn(error);
        }
    }
}

module.exports = api;