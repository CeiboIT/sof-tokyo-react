/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var PostsList = require('../components/posts/PostsList');

var Feed = React.createClass ({
    render(){
        return(
            <PostsList/>
        )
    }
});

module.exports = Feed;

