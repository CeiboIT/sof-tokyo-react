var apiConsts  = require("../../constants/api").apiConsts;
var NewsStream = require("../../services/Streams").getStream("News");
var newsEndpoint = apiConsts.apiEndpoint + 'blog/banners/';

var api = {

    async RetrieveNew(newId) {
        try {
            let response = await fetch(newsEndpoint + 'banner/' + newId);
            NewsStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },
};

module.exports = api;
