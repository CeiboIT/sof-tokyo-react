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

    },
    
    createNewPost(postData) {
        console.warn(productsEndpoint + 'create')
       try{
            let actionResult = fetch(productsEndpoint + 'create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({                    
                    title: postData.title,
                    content:postData.content,
                    img:postData.img,
                    subcategory0:postData.subcategory0,
                    subcategory1:postData.subcategory1,
                    styles:postData.styles,
                    sex:postData.sex,
                    subImg1:postData.subImg1,
                    subImg2:postData.subImg2,
                    subImg3:postData.subImg3,
                    subImg4:postData.subImg4,
                    subImg5:postData.subImg5,
                    subImg6:postData.subImg6,
                    productionCost:postData.productionCost,
                    sell:postData.sell,
                    sellPrice:postData.sellPrice,
                    sellNote:postData.sellNote,
                    rental:postData.rental,
                    rentalPrice:postData.rentalPrice,
                    rentalNote:postData.rentalNote
                })
            })
        } catch(error){
            console.warn(error);
        }
    }

};

module.exports = api;
