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

var styles = StyleSheet.create({
    commentContent: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start"
    },
    userName: {
        fontWeight: "700"
    },
    commentBody: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    commentText: {
        flex: 1,
        flexDirection: "row"
    },
    cellBorder: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
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
                                {this.props.comment.content}
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