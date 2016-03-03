var apiConsts  = require("../../constants/api").apiConsts,
    PostStream = require("../../services/Streams").getStream("Post"),
    productsEndpoint = apiConsts.apiEndpoint + 'products/',
    storage = require("../../services/Storage").getInstance();

var api = {
    async RetrievePost(postId, userId) {
        try {
            let response = await fetch(productsEndpoint + 'product/' + postId);
            PostStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },
    
    async goToPost(url) {
        try {
            if(url){
                let response = await fetch(url + '?json=1');
                var data = JSON.parse(response._bodyInit);
                api.RetrievePost(JSON.parse(data.post.id));
            }
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
            subject.onNext()
        } catch(error){
            console.warn(error);
        }
    },

    sendComment(comment, postId, subject) {
        storage.load({key: 'cookies'})
            .then(ret => {
                fetch(productsEndpoint + 'comments/create',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cookie: ret.cookie,
                        productId: postId,
                        content: comment
                    })
                }).then((response) => {
                    subject.onNext({type:'newComment', data: JSON.parse(response._bodyInit)})
                })
                .catch(error => {
                    console.warn(error);
                })
            })
        ;
    },

    getPostComments(postID) {

    }

};

module.exports = api;
