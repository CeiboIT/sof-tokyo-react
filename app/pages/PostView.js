/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");
var ResponsiveImage = require('react-native-responsive-image');
var PostStream = require("../services/Streams").getStream("Post");
var api = require("../utils/api/PostApi");

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: windowSize.width * 0.4
    },
    title: {
        fontSize: 15
    },

    navIconContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: windowSize.width * 0.4,
        marginVertical:5
    },

    navIcon: {

    }

});


var imageSizes ={
    width: windowSize.width * 0.45,
    height: windowSize.height * 0.6
};


class PostView extends React.Component {
    constructor(props) {
        super(props);
        api.RetrievePost(props.id);

        this.state = {
            postData: {}
        };

        PostStream.subscribe((response) => {
            this.setState({
                postData: response['post']
            });
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <ResponsiveImage source={{uri: this.state.postData.thumbnail}}
                                     initWidth={imageSizes.width} initHeight={imageSizes.height}
                    />
                </View>
                <View>
                    <Text style={styles.title}> { this.state.postData.title}</Text>
                </View>
                <View>
                </View>
            </View>
        )
    }
}

PostView.PropTypes= {
    postId: React.PropTypes.object
};

module.exports = PostView;