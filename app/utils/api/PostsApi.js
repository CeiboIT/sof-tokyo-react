/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiConsts  = require("../../constants/api").apiConsts;
var PostsStream = require("../../services/Streams").getStream("Posts");

var productsEndpoint = apiConsts.apiEndpoint + 'products/';

var api = {
    async LoadPosts(page){
        try {
            let response = await fetch(productsEndpoint + 'list/' + page || 1);
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
            let response = await fetch(productsEndpoint + 'new/' + page || 1);
            PostsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },

    async ByStyle(styleId, page) {
      try {
          let response = await fetch(productsEndpoint + 'bystyle/' + styleId + '/' + (page || 1));
          PostsStream.onNext(JSON.parse(response._bodyInit))
      }catch(error) {
          console.warn(error);
      }
    },

    async forMen(sex, page) {
        try {
            let response = await fetch(productsEndpoint + 'bysex/' + sex + '/' + (page || 1 ));
            PostsStream.onNext(JSON.parse(response._bodyInit))
        }
        catch(error) {
            console.warn(error);
        }
    }
};

module.exports = api;
