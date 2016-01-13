/**
 * Created by epotignano on 10/01/16.
 */

// DECLARE PAGES HERE FOR INSERT IN ROUTES.

var feed = require("./Feed");
var categories = {
    menu: require('./CategoriesMenu')
};
var login = require('./Login');
var register= require('./Register');
var post = require('./PostView');
var schools = require('./Schools');
var profile = require('./Profile');

module.exports = { feed, categories , login, post, schools, profile, register };