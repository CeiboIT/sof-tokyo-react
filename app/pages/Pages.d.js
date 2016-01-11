/**
 * Created by epotignano on 10/01/16.
 */

var feed = require("./Feed");
var categories = {
    menu: require('./CategoriesMenu')
};
var login = require('./Login');
var post = require('./PostView');

module.exports = {feed, categories , login, post};