/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var PostsList = require('../components/posts/PostsList');
var Carousel = require('../components/banners/Carousel');

var {
    ScrollView,
    View
} = React;

var Feed = React.createClass ({
    //This is the main state, this should register the object for maintain the navigation state
    registerNavigatorManager(){
        var NavigationManager = require("../services/NavigationManager");
        NavigationManager.setNavigationManager(this.props)
    },

    render(){
        this.registerNavigatorManager();
        return(
            <ScrollView>
                <Carousel/>
                <PostsList/>
            </ScrollView>
        )
    }
});

module.exports = Feed;

