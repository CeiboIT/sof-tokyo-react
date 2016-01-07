/**
 * Created by mmasuyama on 1/7/2016.
 */

var api = {
    getBio(username: string) {
        username = username.toLowerCase().trim();
        var url = 'https://api.github.com/users/' + username;
        console.log(url);
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;