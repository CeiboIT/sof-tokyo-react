var React = require('react-native'),
    PostsList = require('../components/posts/PostsList'),
    api = require('../utils/api/PostsApi');

var {
    View
    } = React;

var Ranking = React.createClass ({
    render(){
        return(
            <View style={{flex:1,backgroundColor: '#F7F7F7'}}>
                <PostsList elementsPerRow={1} loadPostsFn={api.ByLikes}/>
            </View>
        )
    }
});

module.exports = Ranking;