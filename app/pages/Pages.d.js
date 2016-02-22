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
var uploadImage = require('./UploadImage');
var schoolProfile = require('./SchoolProfile');
var schoolBooksCheckout = require('./SchoolsBookCheckout');
var ranking = require('./Ranking');
var newPosts = require('./NewPosts');
var styles = require('./Styles');
var byStyle = require('./byStyle');
var bySex = require('./bySex');
var createNewPost = require('./createPost/CreateNewPost');
var createNewPostCategory = require('./createPost/CreateNewPostCategory');
var createNewPostStyle = require('./createPost/CreateNewPostStyle');
var contact = require('./Contact');
var categoriesPage = require('./CategoriesMenu');

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
    uploadImage,
    schoolProfile,
    schoolBooksCheckout,
    ranking,
    newPosts,
    styles,
    byStyle,
    bySex,
    createNewPost,
    createNewPostCategory,
    createNewPostStyle,
    contact,
    categoriesPage
};