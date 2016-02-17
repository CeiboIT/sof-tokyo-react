var React = require('react-native');
var PostsList = require('../components/posts/PostsList');
var Carousel = require('../components/banners/Carousel');
var api = require('../utils/api/PostsApi');

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
                <PostsList elementsPerRow={2} loadPostsFn={api.LoadPosts}/>
            </ScrollView>
        )
    }
});

module.exports = Feed;