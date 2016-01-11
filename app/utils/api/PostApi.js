/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiConsts  = require("../../constants/api").apiConsts;

var PostStream = require("../../services/Streams").getStream("Post");

var productsEndpoint = apiConsts.apiEndpoint + 'products/';

var api = {
    async RetrievePost(postId) {
        try {
            let response = await fetch(productsEndpoint + 'product/' + postId);
            PostStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    }
};

module.exports = api;
