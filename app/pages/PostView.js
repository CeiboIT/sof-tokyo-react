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
var UserApi = require("../utils/api/UserApi");
var GiftedSpinner = require('react-native-gifted-spinner');
var GridView = require('react-native-grid-view');

var t = require("tcomb-form-native");
var Rx = require("rx");

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
    Dimensions,
    TouchableHighlight
    } = React;

var Comment = t.struct({
    comment: t.String
})

var Form = t.form.Form;

var styles = StyleSheet.create({
    spinner: {
        marginTop: 20,
        width: 50
    },
    scrollView : {
        backgroundColor: '#FFFFFF'
    },
    container : {
        margin: 10,
        flexDirection: 'column'
    },
    postImageContainer : {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    a : {
        fontWeight: "300",
        color: "#ea4c89"
    },
    p : {
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


var imageSizes ={
    width: windowSize.width * 0.55,
    height: windowSize.height * 0.7
};

var PostId;

var PostView = React.createClass({

    getInitialState() {
        return {
            post: {},
            isLoading:true,
            isLoggedIn: false,
            data: {},
            commentStream: new Rx.Subject()
        }
    },

    componentDidMount(){
        UserApi.isAuthorized().then((result) => {
            this.setState({
                isLoggedIn: result['valid']
            })
        });

        Storage.load({
            key:'UserId'
        }).then(ret => {
            api.RetrievePost(PostId, ret.data)
        })
        .catch(() => {
            api.RetrievePost(PostId)
        })

        PostStream.subscribe((data => {
            this.setState({
                isLoading: false,
                data: data['post']
            })
        }))

        this.state.commentStream.subscribe((result)  => {
            if(result.data.status == 'ok') {
                api.RetrievePost(PostId)
            }
        })

    },

    addComment() {
        var _comment = this.refs.form.getValue();
        api.sendComment(_comment.comment, this.props.id, this.state.commentStream)
    },

    render() {
        var _photo = (this.state.data && this.state.data.thumbnail ) ? this.state.data.thumbnail : "http://res.cloudinary.com/ceiboit/image/upload/v1452990023/imgpsh_fullsize_m24pha.jpg";
        PostId = this.props.id;

        if(this.state.isLoading) return (<GiftedSpinner/>) ;
        var _commentForm = (
            <View>
                <Form type={Comment} ref="form"/>
                <TouchableHighlight onPress={this.addComment}>
                    <Text>Add Comment</Text>
                </TouchableHighlight>
            </View>
        )

        var _renderForm = (this.state.isLoggedIn) ? _commentForm : <Text>Log in for comment</Text>

        var _renderComments;
        if(this.state.data && this.state.data.comments && this.state.data.comments.length){
            _renderComments = <GridView
                items={this.state.data.comments}
                itemsPerRow={1}
                renderItem={(rowData) => <CommentItem comment={rowData} key={rowData.id}/>
                        }
            />
        }
        var _postView = (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.postImageContainer}>
                        <ResponsiveImage source={{uri: _photo}}
                                     initWidth={imageSizes.width}
                                     initHeight={imageSizes.height}/>
                    </View>
                    <PostContentDisplayer content={this.state.data.content}
                                          removeHTMLTags={true}
                                          views={true}
                    />
                    <Avatar author={this.state.data.author}/>
                    { _renderComments }
                    { _commentForm }
                </View>
            </ScrollView>)
        return _postView;
    }
})



PostView.PropTypes= {
    id: React.PropTypes.object
};

module.exports = PostView;