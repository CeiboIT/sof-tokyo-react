/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var PostsList = require('../components/posts/PostsList');
var api = require('../utils/api/PostsApi');

var Feed = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.NewPosts}/>
        )
    }
});

module.exports = Feed;

