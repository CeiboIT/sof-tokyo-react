/**
 * Created by epotignano on 11/01/16.
 */
var apiConsts  = require("../../constants/api").apiConsts;
var SchoolsStream = require("../../services/Streams").getStream("Schools");
var schoolsEndpoint = apiConsts.apiEndpoint + 'metadata/schools/';

var api = {
    async LoadSchools(postId) {
        try {
            let response = await fetch(schoolsEndpoint + 'list/');
            SchoolsStream.onNext({schools: JSON.parse(response._bodyInit)})
        } catch(error){
            console.warn(error);
        }
    }
};

module.exports = api;
