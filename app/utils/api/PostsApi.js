/**
 * Created by mmasuyama on 1/7/2016.
 */

var apiEndpoint= 'https://sof-tokyo-node-server.herokuapp.com/api/';
var productsEndpoint = apiEndpoint + 'products/';

var api = {
    Posts(page) {
        return fetch(productsEndpoint + 'list/' + page)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            })
    }
};

module.exports = api;
