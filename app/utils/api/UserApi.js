/**
 * Created by mmasuyama on 1/7/2016.
 */
//var conf = require('../constants/api');


var apiConsts  = require("../../constants/api").apiConsts;
var storage = require("../../services/Storage").getInstance();
var ErrorSubject = require("../../services/Streams").getStream("Errors");
var UserSubject = require("../../services/Streams").getStream("User");

var api = {

    getAvatar(userId)  {
        return fetch(apiConsts.apiEndpoint + 'auth/get_avatar/' + userId + '/thumb').then((res) => {
            res.json();
        })
    },


    async getMember(memberId, subject){

        try {
            let response = await fetch(apiConsts.apiEndpoint + 'members/member/' + memberId)
            if(subject) {
                subject.onNext({data: JSON.parse(response._bodyInit)})
            } else {
                UserSubject.onNext({data: JSON.parse(response._bodyInit)});
            }

        } catch (error){
            console.warn(error)
        }
    },

    async getUser(userId, subject) {
        try {
            let response = await fetch(apiConsts.apiEndpoint + 'auth/get_user/' + userId)
            if(subject) {
                subject.onNext({data: JSON.parse(response._bodyInit)})
            } else {
                UserSubject.onNext({data: JSON.parse(response._bodyInit)});
            }

        } catch (error) {
            console.warn(error)
        }
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
    },

    registerNewUser(userData){
        return new Promise((reject, resolve) => {
            fetch(apiConsts.apiEndpoint + 'auth/nonce/user/register')
                .then((nonce) => {
                    console.warn('registerNewUser > nonce' , JSON.stringify(nonce));
                    var _nonce = JSON.parse(nonce._bodyInit).nonce
                    fetch(apiConsts.apiEndpoint +'auth/register', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: userData.username,
                            email: userData.email,
                            nonce: _nonce,
                            display_name: userData.displayName
                        })
                    })
                    .then(result => {
                        var _result = JSON.parse(result._bodyInit);
                        if(_result.status !='error') {
                            resolve(_result)
                        } else {
                            reject(_result);
                        }
                    })
                    .catch((error) => {
                        console.warn('registerNewUser > error' , JSON.stringify(error));
                        reject(error);
                    })

                })

        })
    },

    isAuthorized() {
        return new Promise((resolve, reject) => {
            var cookies;
            storage.load({key: 'cookies'})
                .then(ret => {
                    cookie = ret.cookie
                    fetch(apiConsts.apiEndpoint + 'auth/is_authorized',{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cookie
                        })
                    }).then((result) => {
                        resolve(JSON.parse(result._bodyInit))
                    }).catch((error) => {
                        reject(error);
                    })
                }).catch((error) => {
                reject(error);
            })
        });
    }
};

module.exports = api;