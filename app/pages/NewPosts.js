var React = require('react-native'),
    PostsList = require('../components/posts/PostsList'),
    api = require('../utils/api/PostsApi');

var Feed = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.NewPosts}/>
        )
    }
});

module.exports = Feed;

