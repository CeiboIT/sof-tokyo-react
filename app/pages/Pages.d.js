/**
 * Created by epotignano on 10/01/16.
 */

// DECLARE PAGES HERE FOR INSERT IN ROUTES.

var feed = require("./Feed");
var categories = {
    menu: require('./CategoriesMenu')
};
var login = require('./Login');
var post = require('./PostView');
var schools = require('./Schools');

module.exports = { feed, categories , login, post, schools };