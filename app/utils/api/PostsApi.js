/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiConsts  = require("../../constants/api").apiConsts;
var PostsStream = require("../../services/Streams").getStream("Posts");

var productsEndpoint = apiConsts.apiEndpoint + 'products/';

var api = {
    async LoadPosts(page){
        try {
            if(!page) page = 1;
            let response = await fetch(productsEndpoint + 'list/' + page);
            PostsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },
    async bySchool(school) {

    },
    async ByLikes() {
        try {
            let response = await fetch( productsEndpoint+ 'ranking/likes')
            PostsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error) {
            console.warn(error);
        }
    },
    async NewPosts(page) {
        try {
            if(!page) page = 1;
            let response = await fetch(productsEndpoint + 'new/' + page);
            PostsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    }
};

module.exports = api;
