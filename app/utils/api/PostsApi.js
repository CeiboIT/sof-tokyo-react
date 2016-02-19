var apiConsts  = require("../../constants/api").apiConsts,
    PostsStream = require("../../services/Streams").getStream("Posts"),
    productsEndpoint = apiConsts.apiEndpoint + 'products/';

var api = {
    async LoadPosts(page){
        try {
            let response = await fetch(productsEndpoint + 'list/' + page || 1);
            PostsStream.onNext({data: JSON.parse(response._bodyInit), type: 'feed'})
        } catch(error){
            console.warn(error);
        }
    },
    async bySchool(school) {

    },
    async ByLikes() {
        try {
            let response = await fetch( productsEndpoint+ 'ranking/likes');
            PostsStream.onNext({data: JSON.parse(response._bodyInit), type: 'byLikes'})
        } catch(error) {
            console.warn(error);
        }
    },
    async NewPosts(page) {
        try {
            let response = await fetch(productsEndpoint + 'new/' + page || 1);
            PostsStream.onNext({data: JSON.parse(response._bodyInit), type: 'newPosts'})
        } catch(error){
            console.warn(error);
        }
    },

    async ByStyle(styleId, page) {
      try {
          let response = await fetch(productsEndpoint + 'bystyle/' + styleId + '/' + (page || 1));
          PostsStream.onNext({data: JSON.parse(response._bodyInit), type: 'byStyles'})
      }catch(error) {
          console.warn(error);
      }
    },

    async bySex(sex, page) {
        try {
            let response = await fetch(productsEndpoint + 'bysex/' + sex + '/' + (page || 1 ));
            PostsStream.onNext(({data: JSON.parse(response._bodyInit), type: sex}))
        }
        catch(error) {
            console.warn(error);
        }
    }
};

module.exports = api;