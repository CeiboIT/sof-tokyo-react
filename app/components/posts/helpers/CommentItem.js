/**
 * Created by epotignano on 20/01/16.
 */

var React = require("react-native");
var {
    Image,
    StyleSheet,
    PixelRatio,
    Text,
    TouchableHighlight,
    View,
    Dimensions
    } = React;

var Icon = require("react-native-vector-icons/FontAwesome"),
    screen = Dimensions.get('window');

var Avatar = require('../../user/Avatar');
var HTMLView = require('react-native-htmlview');

var styles = StyleSheet.create({
    commentContent: {
        padding: 10,
        flex: 1,
        flexDirection: "column"
    },
    userName: {
        fontWeight: "bold"
    },
    commentBody: {
        flex: 1,
        flexDirection: "column"
    },
    commentText: {
        flex: 1,
        flexDirection: "column"
    },
    cellBorder: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginRight: 10
    }
});

var CommentItem = React.createClass({
    getDefaultProps: function() {
        return {
            comments: []
        }
    },
    
    render () {
        return(<View>
            <TouchableHighlight underlayColor={"#f3f3f3"}>
                <View>
                    <View style={styles.commentContent}>
                        <Avatar author={this.props.comment.author}/>
                        <View style={styles.commentBody}>
                            <Text style={styles.commentText}>
                                <HTMLView
                                    value={this.props.comment.content}
                                />
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cellBorder} />
                </View>
            </TouchableHighlight>
        </View>);
    }
});


module.exports = CommentItem;