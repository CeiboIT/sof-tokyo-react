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
        return fetch(apiConsts.apiEndpoint + '/auth/get_avatar/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    getUser(userId) {
        return fetch(apiConsts.apiEndpoint + '/auth/get_user/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },

    async sendCredentials(credentials){
        console.warn(credentials.username);

        try {
            let response = await fetch(apiConsts.apiEndpoint + '/auth/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    username: credentials.username,
                    password: credentials.password
                }
            });

            return response.body;
        } catch(error){
            console.warn('Hello Error');
            throw error;
        }
    }
};

module.exports = api;