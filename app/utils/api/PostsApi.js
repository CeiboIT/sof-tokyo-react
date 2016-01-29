/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiConsts  = require("../../constants/api").apiConsts;
var PostsStream = require("../../services/Streams").getStream("Posts");

var productsEndpoint = apiConsts.apiEndpoint + 'products/';

var api = {
    async LoadPosts(page){
        try {
            let response = await fetch(productsEndpoint + 'list/' + page);
            PostsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },

    async bySchool(school) {

    }
};

module.exports = api;
