/**
 * Created by mmasuyama on 1/7/2016.
 */
//var conf = require('../constants/api');


var apiConsts  = require("../../constants/api").apiConsts;

var ErrorSubject = require("../../services/Streams").getStream("Errors");
var UserSubject = require("../../services/Streams").getStream("User");

var api = {

    getAvatar(userId)  {
        return fetch(apiConsts.apiEndpoint + 'auth/get_avatar/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    getUser(userId) {
        return fetch(apiConsts.apiEndpoint + 'auth/get_user/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    async sendCredentials(credentials){
        try {
            let response = await fetch(apiConsts.apiEndpoint + 'auth/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                })
            });

        UserSubject.onNext({type: 'login', data: JSON.parse(response._bodyInit)});

        } catch(error){
            UserSubject.onNext({type: 'login', error});
        }
    }
};

module.exports = api;