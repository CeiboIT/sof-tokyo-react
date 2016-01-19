/**
 * Created by epotignano on 19/01/16.
 */


var React = require('react-native');
var Icon = require('react-native-vector-icons/EvilIcons');
var api = require('../../../utils/api/PostApi')

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    postLikeContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})

var PostLike = React.createClass({
    LikePost() {
        var PostLikeSubject = require("../../../services/Streams").getStream("PostLike" +  this.props.id)
        api.LikePost(this.props.data.id, PostLikeSubject);
        PostLikeSubject.subscribe((data) => {
            console.log(data);
        })
    },
    render() {
      return (
          <View>
              <TouchableHighlight onPress={this.LikePost}>
                  <View style={styles.postLikeContainer}>
                      <Icon name="like" size={30}>0</Icon>
                  </View>
              </TouchableHighlight>
          </View>
      )
    }
})

PostLike.propTypes = {
    data : React.PropTypes.object
}

module.exports = PostLike;