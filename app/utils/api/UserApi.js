var apiConsts  = require("../../constants/api").apiConsts,
    storage = require("../../services/Storage").getInstance(),
    ErrorSubject = require("../../services/Streams").getStream("Errors"),
    UserSubject = require("../../services/Streams").getStream("User");

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
            console.warn('getMember > error', JSON.stringify(error));
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
            console.warn('getUser > error ', JSON.stringify(error));
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
            console.warn('sendCredentials > response ' , JSON.stringify(response._bodyInit));
            UserSubject.onNext({type: 'login', data: JSON.parse(response._bodyInit)});
        } catch(error){
            UserSubject.onNext({type: 'login', error});
        }
    },

    registerNewUser(userData){
        return new Promise((resolve, reject) => {
            fetch(apiConsts.apiEndpoint + 'auth/nonce/user/register')
                .then((nonce) => {
                    console.warn('registerNewUser > nonce' , JSON.stringify(nonce));
                    var _nonce = JSON.parse(nonce._bodyInit).nonce;
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
                            display_name: userData.display_name,
                            years: userData.years,
                            ob: userData.obog,
                            country: userData.country,
                            school: userData.school
                        })
                    })
                    .then(result => {
                        var _result = JSON.parse(result._bodyInit);
                        console.warn('registerNewUser > response', JSON.stringify(_result));
                        if(_result.status != 'error') {
                            console.warn('registerNewUser > resolve', JSON.stringify(_result));
                            resolve(_result);
                        } else {
                            console.warn('registerNewUser > reject', JSON.stringify(_result));
                            reject(_result);
                        }
                    })
                    .catch((error) => {
                        console.warn('registerNewUser > fetch post > error ' , JSON.stringify(error));
                        reject(error);
                    });
                })
                .catch((error) => {
                    console.warn('registerNewUser > fetch nonce > error' , JSON.stringify(error));
                    reject(error);
                })
        })
    },

    logout () {
        console.warn('logout');
        UserSubject.onNext({type: 'logout'});
        return storage.remove({key: 'cookies'});
    },

    isAuthorized() {
        return new Promise((resolve, reject) => {
            var cookies;
            storage.load({key: 'cookies'})
                .then(ret => {
                    cookie = ret.cookie;
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