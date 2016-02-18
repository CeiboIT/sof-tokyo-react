var React = require('react-native'),
    PostsList = require('../components/posts/PostsList'),
    api = require('../utils/api/PostsApi');

var Ranking = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.bySex} id={this.props.sex}/>
        )
    }
});

module.exports = Ranking;


