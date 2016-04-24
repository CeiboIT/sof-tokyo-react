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
    screen = Dimensions.get('window'),
    Avatar = require('../../user/Avatar'),
    HTMLView = require('react-native-htmlview');

var styles = StyleSheet.create({
    commentContent: {
        flex: 1,
        padding: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: 'wrap',
    },
    commentText: {
        marginLeft: 55
    },
    cellBorder: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    }
});

var CommentItem = React.createClass({
    getDefaultProps: function() {
        return {
            comments: []
        }
    },    
    render () {

        console.log(this.props.comment.content)

        return(<View style={{flex:1,flexDirection: "column"}}>
            <TouchableHighlight underlayColor={'transparent'}>
                <View>
                    <View style={styles.commentContent}>
                        <Avatar author={this.props.comment.author} size={'large'}/>
                    </View>
                    <View style={styles.commentText}>
                        <HTMLView
                            value={this.props.comment.content} stylesheet={{p : {fontSize: 20}}}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        </View>);
    }
});


module.exports = CommentItem;