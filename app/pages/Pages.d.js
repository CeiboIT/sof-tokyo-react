var feed = require("./Feed"),
    categories = {
        menu: require('./CategoriesMenu')
    },
    login = require('./Login'),
    about = require('./About'),
    register= require('./Register'),
    post = require('./PostView'),
    schools = require('./Schools'),
    news = require('./News'),
    profile = require('./Profile'),
    search = require('./Search'),
    searchResults = require('./SearchResults'),
    schoolProfile = require('./SchoolProfile'),
    schoolBooksCheckout = require('./SchoolsBookCheckout'),
    ranking = require('./Ranking'),
    newPosts = require('./NewPosts'),
    styles = require('./Styles'),
    byCategory = require('./byCategory'),
    byStyle = require('./byStyle'),
    bySex = require('./bySex'),
    contact = require('./Contact'),
    creation = require('./createPost/CreateNewPost'),
    categoriesPage = require('./CategoriesMenu');

module.exports = {
    feed,
    categories,
    login,
    post,
    schools,
    news,
    profile,
    register,
    creation,
    search,
    searchResults,
    about,
    schoolProfile,
    schoolBooksCheckout,
    ranking,
    newPosts,
    styles,
    byCategory,
    byStyle,
    bySex,
    contact,
    categoriesPage
};