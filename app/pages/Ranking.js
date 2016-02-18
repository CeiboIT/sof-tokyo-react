var React = require('react-native'),
    PostsList = require('../components/posts/PostsList'),
    api = require('../utils/api/PostsApi');

var Ranking = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={1} loadPostsFn={api.ByLikes}/>
        )
    }
});

module.exports = Ranking;