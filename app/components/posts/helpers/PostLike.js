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

    retrieveLikes(metadata) {
        var _value;
        metadata.some((element) => {
            if(element['field'] == '_item_likes'){
                _value = element['value'];
                return true;
            }
        })
        return _value;
    },
    render() {
        var _likes = this.retrieveLikes(this.props.data['metadata']);
        return (
          <View style={styles.postLikeContainer}>
              <TouchableHighlight onPress={this.LikePost}>
                  <View>
                    <Text style={styles.likeText}>
                      <Icon name="heart-o" size={18} color="#bbbbbb"/> { _likes }
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