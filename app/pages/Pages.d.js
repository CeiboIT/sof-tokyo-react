/**
 * Created by epotignano on 10/01/16.
 */

// DECLARE PAGES HERE FOR INSERT IN ROUTES.

var feed = require("./Feed");
var categories = {
    menu: require('./CategoriesMenu')
};
var login = require('./Login');
var about = require('./About');
var register= require('./Register');
var post = require('./PostView');
var schools = require('./Schools');
var news = require('./News');
var profile = require('./Profile');
var search = require('./Search');
var searchResults = require('./SearchResults');
var schoolProfile = require('./SchoolProfile');
var schoolBooksCheckout = require('./SchoolsBookCheckout');

module.exports = {
    feed,
    categories,
    login,
    post,
    schools,
    news,
    profile,
    register,
    search,
    searchResults,
    about,
    schoolProfile,
    schoolBooksCheckout
};