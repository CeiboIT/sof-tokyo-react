var apiConsts  = require("../../constants/api").apiConsts;
var BannersStream = require("../../services/Streams").getStream("Banners");
var bannersEndpoint = apiConsts.apiEndpoint + 'blog/banners';

var api = {
    async LoadBanners() {
        try {
            let response = await fetch(bannersEndpoint);
            BannersStream.onNext(JSON.parse(response._bodyInit))
        } catch(error){
            console.warn(error);
        }
    },
};

module.exports = api;
