var React = require('react-native');
    PostsList = require('../components/posts/PostsList');
    api = require('../utils/api/PostsApi');

var {
    View
    } = React;

var byStyle = React.createClass ({
    render(){
        return(
            <View style={{flex:1,backgroundColor: '#F7F7F7'}}>
                <PostsList elementsPerRow={2} loadPostsFn={api.ByStyle} id={this.props.styleId}/>
            </View>
        )
    }
});

module.exports = byStyle;