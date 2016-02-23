var React = require('react-native'),
    Icon = require('react-native-vector-icons/FontAwesome'),
    api = require('../../../utils/api/PostApi'),
    UserApi = require("../../../utils/api/UserApi");

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    postLikeContainer: {
        flex:1,
        flexDirection:'row'
    },
    likeText : {
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        color: '#b3b3b3'
    }
})

var PostLike = React.createClass({

    getInitialState() {
        return {
            isLoggedIn: false,
            like: 0
        }
    },

    componentDidMount(){
        UserApi.isAuthorized().then((result) => {
            this.setState({
                isLoggedIn: result['valid']
            })
        });
        this.setState({
            like: this.retrieveLikes(this.props.data['metadata'])
        })
    },

    LikePost() {
        if(this.state.isLoggedIn){
            var PostLikeSubject = require("../../../services/Streams").getStream("PostLike" +  this.props.id);
            api.LikePost(this.props.data.id, PostLikeSubject);
            PostLikeSubject.subscribe((data) => {

            });
            this.setState({
                like: parseInt(this.state.like) + 1
            })
        }
    },

    retrieveLikes(metadata) {
        var _value;
        if(metadata) {
            metadata.some((element) => {
                if(element['field'] == '_item_likes'){
                    _value = element['value'];
                    return true;
                }
            })
        }
        return _value;
    },
    render() {
        return (
          <View style={styles.postLikeContainer}>
              <TouchableHighlight underlayColor={'transparent'} onPress={this.LikePost}>
                  <View>
                    <Text style={styles.likeText}>
                        <Icon name="heart-o" size={16} color="#bbbbbb"/> { this.state.like }
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