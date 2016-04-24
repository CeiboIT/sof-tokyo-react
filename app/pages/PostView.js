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
        backgroundColor: '#FFF'
    },
    container : {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    section : {
        padding: 10,
    },
    linksContainer : {
        flex:1, 
        flexDirection: 'row', 
        backgroundColor:'rgba(0,0,0,0.6)', 
        padding: 10
    },
    previousPost: {
        flex:1,
        paddingLeft: 10
    },
    nextPost: {
        flex:1,
        paddingRight: 10
    },
    textWhite : {
      color: 'white',
      fontSize: 11
    },
    title : {
        fontSize: 15,
        color: '#444444',
        marginHorizontal: 15,
        marginBottom: 5
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
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText : {
        color: "#367bb7"

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
    views : {
      marginTop: 20
    },
    date : {
        marginBottom: 5,
        marginLeft: 20
    },
    dateText : {
      fontWeight: 'bold',  
    },
    commentCount : {
        marginLeft: 20
    },
    comments : {
        flex: 1,
        flexDirection: 'column', 
        flexWrap: 'wrap'
    }
});


var imageSizes ={
    width: windowSize.width * 1.45,
    height: windowSize.height * 1.20
};

var PostId;

var PostView = React.createClass({
    getInitialState() {
        return {
            post: {},
            isLoading:true,
            isLoggedIn: false,
            isDisabled: false,
            data: {},
            nextUrl: '',
            previousUrl: '',
            commentStream: new Rx.Subject(),
            mainImage: 'http://res.cloudinary.com/ceiboit/image/upload/v1452990023/imgpsh_fullsize_m24pha.jpg'
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
                data: data['post'],
                nextUrl: data['next_url'],
                previousUrl: data['previous_url'],
                isLoading: false
            })
            this.setState({
                mainImage: (this.state.data && this.state.data.thumbnail ) ? this.state.data.thumbnail : "http://res.cloudinary.com/ceiboit/image/upload/v1452990023/imgpsh_fullsize_m24pha.jpg"
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
    goToNext() {
        var url = this.state.nextUrl;
        if(url){
            this.setState({
               isLoading: true
            })
            api.goToPost(url)
        }
    },
    goToPrevious() {
        var url = this.state.previousUrl;
        if(url){
            this.setState({
               isLoading: true
            })
            api.goToPost(url)
        }
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
                    if(metadata.field == field) {
                        var _value = metadata.value | '0';
                        cost.push({type: '制作費', name: _value, id: _value});
                    }
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
     getDate() {
        return this.state.data.date.split(' ')[0];
    },
    setMainImage(rowData) {
        this.setState({
            mainImage: rowData.image
        })
    },
    render() {
        
        var images = [],
            _subImages;
        if(this.state.data && this.state.data.custom_fields){
            var _customFields = Object.keys(this.state.data.custom_fields),
                subImage = 'sofbackend__sof_work_meta__subImage';
            _customFields.map((key) => {
                if(this.state.data.custom_fields[key] && this.state.data.custom_fields[key][0]){
                    if(key == subImage+'1' || key == subImage+'2' || key == subImage+'3' || key == subImage+'4' || key == subImage+'5' || key == subImage+'6' || key == subImage+'7' || key == subImage+'8' || key == subImage+'9'){
                        images.push({id: key, image: this.state.data.custom_fields[key][0]});
                    }
                }
            });
            
            _subImages = <GridView
                            items={images}
                            itemsPerRow={4}
                            renderItem={(rowData) => <View key={rowData.id}><TouchableHighlight underlayColor={'transparent'} onPress={()=>this.setMainImage(rowData)} key={rowData.id}><View><Image source={{uri: rowData.image}} style={{width: 86, height: 86}} key={rowData.id}/></View></TouchableHighlight></View>
                            }
                         />
        }
        
        PostId = this.props.id;

        if(this.state.isLoading) return (<View style={styles.loading}><GiftedSpinner/></View>) ;
        var _commentForm = (
            <View>
                <Form type={Comment} ref="form"/>
                <TouchableHighlight onPress={this.addComment} underlayColor={'#e5e5f0'} style={styles.button}>
                    <Text style={styles.buttonText}>コメントする</Text>
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
                <ScrollView style={styles.scrollView}>
                    <View style={styles.linksContainer}>
                        <View style={styles.previousPost}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={this.goToPrevious} style={{alignSelf: 'flex-start'}}><Text style={styles.textWhite}>« 前へ</Text></TouchableHighlight>
                        </View>
                        <View style={styles.nextPost}>
                            <TouchableHighlight underlayColor={'transparent'} onPress={this.goToNext} style={{alignSelf: 'flex-end'}}><Text style={styles.textWhite}>次へ »</Text></TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.state.data.title}</Text>
                        <View style={styles.section}>
                            <View style={styles.postImageContainer}>
                                <ResponsiveImage initWidth={imageSizes.width} initHeight={imageSizes.height}
                                        source={{uri:  this.state.mainImage }} resizeMode="stretch" />
                                { _subImages }
                            </View>
                            <PostContentDisplayer content={this.state.data.content}
                                                removeHTMLTags={true}
                                                views={false}
                            />

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>カテゴリー</Text>
                            </View>
                            {
                                this.getCategories().map((data) => {
                                    return <View key={data.id}>
                                                <Text style={{color: '#367bb7', fontSize: 20}}>{data.name}</Text>
                                            </View>
                                    })
                            }

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>STYLES</Text>
                            </View>
                            {
                                this.getStyles().map((data) => {
                                    return <View key={data.id}>
                                                <Text style={{color: '#367bb7', fontSize: 20}}>{data.name}</Text>
                                            </View>
                                    })
                            }

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                                <Text style={{fontWeight: 'bold', fontSize:20}}>制作費</Text>
                            </View>
                            {
                                this.getCost().map((data) => {
                                    return <View key={data.id}>
                                                <Text style={{ fontSize: 20 }}>{data.name} 円</Text>
                                            </View>
                                    })
                            }

                            <View style={{borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop:10}}>
                                <Text style={{fontWeight: 'bold', fontSize: 20}}>買い取り</Text>
                            </View>
                            {
                                this.getNote().map((data) => {
                                    return <View key={data.id}>
                                        <Text style={{ fontSize: 20 }}>{data.name}</Text>
                                    </View>
                                })
                            }
                            
                            <View style={styles.views}>
                                <Text><Icon name="signal" size={18}/> Post Views: {this.state.data.visits}</Text>
                            </View>
                        </View>


                        <View style={[styles.section, {marginVertical:10, borderWidth: 1,borderColor: '#e5e5e5', backgroundColor: 'white'}]}>
                            <View style={styles.author}>
                                <Avatar author={this.state.data.author} size={'large'}/>
                            </View>
                            <View style={styles.date}>
                                <Text style={styles.dateText}>{this.getDate()}</Text>
                            </View>
                            <View style={styles.commentCount}>
                                <Text>{this.state.data.comment_count} <Icon name="comments" size={18}/></Text>
                            </View>
                        </View>
                        
                        <View style={[styles.section, styles.comments]}>
                            { _renderComments }
                            { _renderForm }
                        </View>
                    </View>
                </ScrollView>
            );
        return _postView;
    }
})



PostView.PropTypes= {
    id: React.PropTypes.object
};

module.exports = PostView;