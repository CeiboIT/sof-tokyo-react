/**
 * Created by epotignano on 10/01/16.
 */

var feed = require("./Feed");
var categories = {
    menu: require('./CategoriesMenu')
};
var login = require('./Login');

module.exports = {feed, categories , login};