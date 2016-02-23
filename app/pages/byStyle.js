var React = require('react-native');
    PostsList = require('../components/posts/PostsList');
    api = require('../utils/api/PostsApi');

var byStyle = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.ByStyle} id={this.props.styleId}/>
        )
    }
});

module.exports = byStyle;