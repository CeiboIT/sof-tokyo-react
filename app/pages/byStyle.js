/**
 * Created by epotignano on 30/01/16.
 */


/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var PostsList = require('../components/posts/PostsList');
var api = require('../utils/api/PostsApi');

var Ranking = React.createClass ({
    render(){
        return(
            <PostsList elementsPerRow={2} loadPostsFn={api.ByStyle} id={this.props.styleId}/>
        )
    }
});

module.exports = Ranking;

