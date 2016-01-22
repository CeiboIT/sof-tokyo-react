/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");
var ResponsiveImage = require('react-native-responsive-image');
var PostStream = require("../services/Streams").getStream("Post");
var Storage = require("../services/Storage").getInstance();
var api = require("../utils/api/PostApi");
var GiftedSpinner = require('react-native-gifted-spinner');
var GridView = require('react-native-grid-view');

var PostContentDisplayer = require("../components/posts/helpers/PostContentDisplayer");
var Avatar = require("../components/user/Avatar");
var CommentItem = require("../components/posts/helpers/CommentItem");

var Icon = require("react-native-vector-icons/FontAwesome"),
    screen = Dimensions.get('window');

var {
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions
    } = React;

var imageSizes ={
    width: windowSize.width * 0.45,
    height: windowSize.height * 0.6
};

var PostId;

var PostView = React.createClass({

    getInitialState() {
        return {
            post: {},
            isLoading:true
        }
    },

    componentDidMount(){
        Storage.load({
            key:'UserId'
        }).then(ret => {
            api.RetrievePost(PostId, ret.data)
        })

        PostStream.subscribe((data => {
            this.setState({
                isLoading: false,
                data: data['post']
            })
        }))
    },

    render() {
        var _photo = (this.state.data && this.state.data.thumbnail ) ? this.state.data.thumbnail : "http://res.cloudinary.com/ceiboit/image/upload/v1452990023/imgpsh_fullsize_m24pha.jpg";
        PostId = this.props.id;

        if(this.state.isLoading) return (<GiftedSpinner/>) ;

        var _postView = (
            <View style={styles.container}>
                <ScrollView>
                    <ResponsiveImage style={styles.image} source={{uri: _photo}}
                                     initWidth={imageSizes.width}
                                     initHeight={imageSizes.height}/>

                    <PostContentDisplayer content={this.state.data.content}
                                          removeHTMLTags={true}
                    />
                    <View >
                        <Avatar author={this.state.data.author}/>
                    </View>
                    <GridView
                        items={this.state.data.comments}
                        itemsPerRow={1}
                        renderItem={(rowData) => <CommentItem comment={rowData} key={rowData.id}/>
                        }
                    />
                </ScrollView>
            </View>)
        return _postView;
    }
})


var styles = StyleSheet.create({
    spinner: {
        marginTop: 20,
        width: 50
    },

    postImage: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    a: {
        fontWeight: "300",
        color: "#ea4c89"
    },
    p: {
        marginBottom: 0,
        flexDirection: "row",
        marginTop: 0,
    },
    invisibleView: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right:0
    },
    customModalImage: {
        height: screen.height / 2
    },
    headerContent: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 40,
        alignItems: "center",
        width: screen.width,
        backgroundColor: "#fff"
    },
    shotTitle: {
        fontSize: 16,
        fontWeight: "400",
        color: "#ea4c89",
        lineHeight: 18
    },
    playerContent: {
        fontSize: 12
    },
    player: {
        fontWeight: "900",
        lineHeight: 18
    },
    playerAvatar: {
        borderRadius: 40,
        width: 80,
        height: 80,
        position: "absolute",
        bottom: 60,
        left: screen.width / 2 - 40,
        borderWidth: 2,
        borderColor: "#fff"
    },
    rightPane: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    shotDetailsRow: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        flexDirection: "row"
    },
    shotCounter: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-between"
    },
    shotCounterText: {
        color: "#333"
    },
    mainSection: {
        flex: 1,
        alignItems: "stretch",
        padding: 10,
        backgroundColor: "white"
    },
    separator: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: 1 / PixelRatio.get(),
        marginVertical: 10,
    },
    sectionSpacing: {
        marginTop: 20
    },
    heading: {
        fontWeight: "700",
        fontSize: 16
    }
});

PostView.PropTypes= {
    id: React.PropTypes.object
};

module.exports = PostView;