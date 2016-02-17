/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");
var PixelRatio = require("PixelRatio");

var ResponsiveImage = require('react-native-responsive-image');
var Icon = require('react-native-vector-icons/FontAwesome');
var Avatar = require('../user/Avatar');
var PostLike = require('./helpers/PostLike')
var  PostContentDisplayer = require('./helpers/PostContentDisplayer')

var {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: windowSize.width * 0.55
    },
    contentTitle : {
        borderLeftWidth: 2,
        borderColor: '#8a52ad',
        paddingLeft: 2
    },
    title: {
        fontSize: 15,
        color: '#444444'
    },
    navIconContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5
        //width: windowSize.width * 0.4,
        //marginVertical:5
    },
    authorDataDisplayContainer : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        width: windowSize.width * 0.55,
        padding: 5
    },
    textContainer : {
        flex:1,
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    padding : {
        padding: 5
    },
    elementFooter : {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    iconPlus : {
        color: '#aaaaaa',
        fontSize: 12
    }

});

var NavigateToPost  = React.createClass({
    goToPost () {
        var subject= require("../../services/NavigationManager").getStream();
        subject.onNext({path:'post', params: {id: this.props.id} })
    },
    render() {
        return (
            <TouchableHighlight onPress={this.goToPost} style={styles.navIconContainer} underlayColor={'transparent'}>
                <Icon name="plus" style={styles.iconPlus}/>
            </TouchableHighlight>
        )
    }
});

NavigateToPost.propTypes= {
    id: React.PropTypes.number
};

var ElementFooter = React.createClass({
    render() {
        return (
            <View style={styles.elementFooter}>
                <PostLike data={this.props.data}></PostLike>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.goToPost} style={styles.textContainer}>
                    <Text>
                        {this.props.data['comment_count']} <Icon name="comments-o" size={18} color="#bbbbbb"/>
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

})

ElementFooter.propTypes= {
    data: React.PropTypes.object
};

var PostElement = React.createClass({
    tap () {
        console.warn('Tapped');
        NavigatorSubject.onNext({path: 'post', params: {id: this.props.postData.id }})
    },

    goToPost () {
        var subject= require("../../services/NavigationManager").getStream();
        subject.onNext({path:'post', params: {id: this.props.postData.id} })
    },
    imageSize () {
        var size = {
            height: null,
            width: windowSize.width * 0.55
        }
        if(windowSize.width <= 360){
            size.height = windowSize.height * 0.6;
        }else{
            size.height = windowSize.height * 2;
        }   
        
        return size  
    },
    getThumbnail () {
      if(this.props.postData.thumbnail){
          return this.props.postData.thumbnail
      }else{
        return '"' + this.props.postData.custom_fields.sofbackend__sof_work_meta__postImage[0]+ '"';  
      }
    },
    render() {
        return(
            <View style={styles.container}>
                <View style={{overflow:'hidden'}}>
                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.9)'} onPress={this.goToPost}>
                        <Image style={[this.imageSize()]} 
                            source={{uri:  this.getThumbnail() }} />
                    </TouchableHighlight>
                </View>
                <NavigateToPost id={this.props.postData.id}/>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}> { this.props.postData.title }</Text>
                </View>
                <PostContentDisplayer content={this.props.postData.content}
                    removeHTMLTags={true} crop={30} style={styles.padding}
                />
                <View style={styles.authorDataDisplayContainer} >
                    <Avatar author={this.props.postData.author}/>
                </View>
                <ElementFooter data={this.props.postData}/>
            </View>
        )
    }
});

PostElement.propTypes = {
    postData: React.PropTypes.object

};

module.exports = PostElement;