/**
 * Created by mmasuyama on 1/7/2016.
 */
//var conf = require('../constants/api');


    import { apiConsts } from "../../constants/api"



var api = {
    getBio(username: string) {
        username = username.toLowerCase().trim();
        var url = 'https://api.github.com/users/' + username;
        return fetch(url).then((res) => res.json());
    },

    getAvatar(userId)  {
        return fetch(conf.apiEndpoint + '/auth/get_avatar/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    getUser(userId) {
        return fetch(conf.apiEndpoint + '/auth/get_user/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    sendCredentials(credentials){
        return fetch(conf.apiEndpoint + '/auth/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        }).then((res) => {
            console.log(res);
            res.json();
        })
    }
};

module.exports = api;