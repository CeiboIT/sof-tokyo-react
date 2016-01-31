/**
 * Created by epotignano on 30/01/16.
 */


/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var PostsList = require('../components/posts/PostsList');
var api = require('../utils/api/PostsApi');

var Feed = React.createClass ({

    //This is the main state, this should register the object for maintain the navigation state
    registerNavigatorManager(){
        var NavigationManager = require("../services/NavigationManager");
        NavigationManager.setNavigationManager(this.props)
    },

    render(){
        return(
            <PostsList elementsPerRow={1} loadPostsFn={api.ByLikes}/>
        )
    }
});

module.exports = Feed;

