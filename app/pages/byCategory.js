var React = require('react-native');
    PostsList = require('../components/posts/PostsList');
    api = require('../utils/api/PostsApi');

var byCategory = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.ByCategory} id={this.props.categoryId}/>
        )
    }
});

module.exports = byCategory;

