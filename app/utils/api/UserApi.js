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
        try {
            let response = await fetch("https://sof-tokyo-node-server.herokuapp.com/api/" + 'auth/login',{
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

            console.warn(response.body);
        } catch(error){
            console.warn(error);
            throw error;
        }
    }
};

module.exports = api;