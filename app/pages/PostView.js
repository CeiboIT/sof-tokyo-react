var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window"),
    ResponsiveImage = require('react-native-responsive-image'),
    PostStream = require("../services/Streams").getStream("Post"),
    Storage = require("../services/Storage").getInstance(),
    api = require("../utils/api/PostApi"),
    UserApi = require("../utils/api/UserApi"),
    GiftedSpinner = require('react-native-gifted-spinner'),
    GridView = require('react-native-grid-view'),
    Modal = require('react-native-modalbox'),
    t = require("tcomb-form-native"),
    Rx = require("rx"),
    PostContentDisplayer = require("../components/posts/helpers/PostContentDisplayer"),
    Avatar = require("../components/user/Avatar"),
    CommentItem = require("../components/posts/helpers/CommentItem"),
    HTMLView = require('react-native-htmlview'),
    Icon = require("react-native-vector-icons/FontAwesome"),
    screen = Dimensions.get('window');

var {
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image
    } = React;

var Comment = t.struct({
    comment: t.String
})

var Form = t.form.Form;

var styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    },
    scrollView : {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    container : {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    section : {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    author : {
      margin: 10
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
    },
    button : {
        borderColor: "#8a52ad",
        borderWidth: 2,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText : {
        color: "#8a52ad"

    },
    grind : {
        flex: 1,
        flexDirection: 'column', 
        flexWrap: 'wrap',
        width: windowSize.width - 40,
        alignSelf: 'flex-start',
        overflow:'hidden'
    },
    wrapper: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowSize.height * 0.7
    },
    btnModalContainer : {
        position: 'absolute',
        top: 10,
        right: 10
    },
    comments : {
        flex: 1,
        flexDirection: 'column', 
        flexWrap: 'wrap'
    }
});


var imageSizes ={
    width: windowSize.width * 0.55,
    height: windowSize.height * 0.7
};

var PostId;

var PostView = React.createClass({
    openModal: function(element) {
        this.setState({
            isOpen: true,
            imageSel: element.image
            });
        this.refs.scrollView.scrollTo(0);
    },

    closeModal: function(element) {
        this.setState({isOpen: false});
    },

    toggleDisable: function() {
        this.setState({isDisabled: !this.state.isDisabled});
    },

    toggleSwipeToClose: function() {
        this.setState({swipeToClose: !this.state.swipeToClose});
    },

    onClose: function() {
        
    },

    onOpen: function() {
        
    },

    onClosingState: function(state) {
        
    },
    getInitialState() {
        return {
            post: {},
            isLoading:true,
            isLoggedIn: false,
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            imageSel: '',
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
    getStyles () {
        var styles = [];
        if(this.state.data && this.state.data.metadata){
            var _metadata = this.state.data.metadata,
                field = 'sofbackend__sof_work_meta__style';
                _metadata.map((metadata) => {
                    if(metadata.field == field) styles.push({name: metadata.trad, id: metadata.value});
                })
        }
        return styles;
    },
    getCategories () {
        var categories = [];
        if(this.state.data && this.state.data.metadata){
            var _metadata = this.state.data.metadata,
                field = 'sofbackend__sof_work_meta__';
                _metadata.map((metadata, i) => {
                    if((metadata.field == field+'category_0' || metadata.field == field+'category_1') && metadata.trad) categories.push({type: 'カテゴリー', name: metadata.trad, id: i});
                })
        }
        return categories;
    },
    getCost () {
        var cost = [];
        if(this.state.data && this.state.data.metadata){
            var _metadata = this.state.data.metadata,
                field = 'sofbackend__sof_work_meta__productionCost';
                _metadata.map((metadata) => {
                    if(metadata.field == field) cost.push({type: '制作費', name: metadata.value, id: metadata.value});
                })
        }
        return cost;
    },
    getNote() {
        var note = [];
        if(this.state.data && this.state.data.metadata){
            var _metadata = this.state.data.metadata,
                field = 'sofbackend__sof_work_meta__sellNote';
            _metadata.map((metadata) => {
                if(metadata.field == field) note.push({type: '制作費', name: metadata.value, id: metadata.value});
            })
        }
        return note;
    },
    render() {
        
        var images = [],
            _subImages;
        if(this.state.data && this.state.data.custom_fields){
            var _customFields = Object.keys(this.state.data.custom_fields),
                subImage = 'sofbackend__sof_work_meta__subImage';
            _customFields.map((key) => {
                if(this.state.data.custom_fields[key] && this.state.data.custom_fields[key][0]){
                    if(key == subImage+'1' || key == subImage+'2' || key == subImage+'3' || key == subImage+'4' || key == subImage+'5' || key == subImage+'6'){
                        images.push({id: key, image: this.state.data.custom_fields[key][0]});
                    }
                }
            });
            
            _subImages = <GridView
                            items={images}
                            renderItem={(rowData) => <View key={rowData.id}><TouchableHighlight underlayColor={'transparent'} onPress={()=>this.openModal(rowData)} key={rowData.id}><View><Image source={{uri: rowData.image}} style={{width: 86, height: 86}} key={rowData.id}/></View></TouchableHighlight></View>
                            }
                         />
        }
        
        var _photo = (this.state.data && this.state.data.thumbnail ) ? this.state.data.thumbnail : "http://res.cloudinary.com/ceiboit/image/upload/v1452990023/imgpsh_fullsize_m24pha.jpg";
        PostId = this.props.id;

        if(this.state.isLoading) return (<View style={styles.loading}><GiftedSpinner/></View>) ;
        var _commentForm = (
            <View>
                <Form type={Comment} ref="form"/>
                <TouchableHighlight onPress={this.addComment} underlayColor={'transparent'} style={styles.button}>
                    <Text style={styles.buttonText}>Add Comment</Text>
                </TouchableHighlight>
            </View>
        )

        var _renderForm = (this.state.isLoggedIn) ? _commentForm : <Text>Log in for comment</Text>

        var _renderComments;
        if(this.state.data && this.state.data.comments && this.state.data.comments.length){
            _renderComments = <GridView
                style={styles.grind}
                items={this.state.data.comments}
                itemsPerRow={1}
                renderItem={(rowData) => <CommentItem comment={rowData} key={rowData.id}/>
                        }
            />
        }
        
        var _postView = (
            <ScrollView style={styles.scrollView} ref="scrollView">
                <View style={[styles.container, styles.wrapper]}>
                    <View style={styles.section}>
                        <View style={styles.postImageContainer}>
                            <ResponsiveImage source={{uri: _photo}}
                                        initWidth={imageSizes.width}
                                        initHeight={imageSizes.height}/>
                                        
                            <View>
                                { _subImages }
                            </View>
                        </View>
                        <PostContentDisplayer content={this.state.data.content}
                                              removeHTMLTags={true}
                                              views={true}
                        />

                        <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                            <Text style={{fontWeight: 'bold'}}>カテゴリー</Text>
                        </View>
                        {
                            this.getCategories().map((data) => {
                                return <View key={data.id}>
                                            <Text>{data.name}</Text>
                                        </View>
                                })
                        }

                        <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                            <Text style={{fontWeight: 'bold'}}>STYLES</Text>
                        </View>
                        {
                            this.getStyles().map((data) => {
                                return <View key={data.id}>
                                            <Text>{data.name}</Text>
                                        </View>
                                })
                        }

                        <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                            <Text style={{fontWeight: 'bold'}}>制作費</Text>
                        </View>
                        {
                            this.getCost().map((data) => {
                                return <View key={data.id}>
                                            <Text>{data.name} 円</Text>
                                        </View>
                                })
                        }

                        <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                            <Text style={{fontWeight: 'bold'}}>買い取り</Text>
                        </View>
                        {
                            this.getNote().map((data) => {
                                return <View key={data.id}>
                                    <Text>{data.name}</Text>
                                </View>
                            })
                        }

                    </View>



                    <View style={styles.author}>
                        <Avatar author={this.state.data.author}/>
                    </View>
                    <View style={[styles.section, styles.comments]}>
                        { _renderComments }
                        { _renderForm }
                    </View>
                </View>
                <Modal isOpen={this.state.isOpen} onClosed={this.closeModal} style={styles.modal} position={"top"}>
                    <TouchableHighlight onPress={this.closeModal} underlayColor={'transparent'} style={styles.btnModalContainer}><Text><Icon name="times" size={18} style={{color: 'gray'}}/></Text></TouchableHighlight>
                    <ResponsiveImage source={{uri: this.state.imageSel}} initWidth={imageSizes.width} initHeight={imageSizes.height}/>
                </Modal>
            </ScrollView>);
        return _postView;
    }
})



PostView.PropTypes= {
    id: React.PropTypes.object
};

module.exports = PostView;