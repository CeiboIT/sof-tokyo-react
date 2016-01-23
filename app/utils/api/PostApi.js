/**
 * Created by mmasuyama on 1/7/2016.
 */
var apiConsts  = require("../../constants/api").apiConsts;
var PostStream = require("../../services/Streams").getStream("Post");
var productsEndpoint = apiConsts.apiEndpoint + 'products/';


var api = {
    async RetrievePost(postId, userId) {
        try {
            let response = await fetch(productsEndpoint + 'product/' + postId + '/' + userId);
            PostStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },

    async LikePost(postId, subject) {
        try{
            let actionResult = fetch(apiConsts.apiEndpoint + 'metadata/likes/product', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: postId
                })
            })
            subject.onNext(JSON.parse(actionResult._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },

    async sendComment(comment, postId, subject) {
        try {
            let cookie = await storage.load({key: 'cookies'});
            let commentPost = await fetch(productsEndpoint + 'comments/create',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookie.data,
                    productId: postId,
                    content: comment
                })
            })
            subject.onNext({type:'comment', data: JSON.parse(commentPost._bodyInit)})
        }catch(error){
            console.warn(error);
        }
    }
};

module.exports = api;
