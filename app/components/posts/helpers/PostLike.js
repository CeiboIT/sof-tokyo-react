/**
 * Created by epotignano on 19/01/16.
 */


var React = require('react-native');
// var Icon = require('react-native-vector-icons/EvilIcons');
var Icon = require('react-native-vector-icons/FontAwesome');
var api = require('../../../utils/api/PostApi')

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    postLikeContainer: {
        flex:1,
        flexDirection:'row',
        // justifyContent: 'flex-start'
    },
    likeText : {
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start'  
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
          <View style={styles.postLikeContainer}>
              <TouchableHighlight underlayColor={'transparent'} onPress={this.LikePost}>
                  <View>
                    <Text style={styles.likeText}>
                      <Icon name="heart-o" size={18} color="#bbbbbb"/> 0
                    </Text>
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