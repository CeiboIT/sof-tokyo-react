var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window"),
    PixelRatio = require("PixelRatio"),
    ResponsiveImage = require('react-native-responsive-image'),
    Icon = require('react-native-vector-icons/FontAwesome'),
    Avatar = require('../user/Avatar'),
    PostLike = require('./helpers/PostLike'),
    MetadataDisplay = require('./helpers/MetadataDisplay'),
    PostContentDisplayer = require('./helpers/PostContentDisplayer');

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
        width: windowSize.width * 0.55,
        overflow: "hidden"
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
    getMetadata () {
        var arr = [];
        
        if(this.props.postData && this.props.postData.metadata){
            var _metadata = this.props.postData.metadata,
                field = 'sofbackend__sof_work_meta__';
            _metadata.map((metadata) => {
                if(metadata.field == field+'style') arr.push({type: 'style', name: metadata.trad, id: metadata.value});
                if(metadata.field == field+'category_1') arr.push({type: 'category', name: metadata.trad, id: metadata.value});
            });
        }
        
        return arr
    },
    render() {
        
        return(
            <View style={styles.container}>
                <View>
                    <TouchableHighlight underlayColor={'rgba(0,0,0,0.9)'} onPress={this.goToPost}>
                        <Image style={[this.imageSize()]} 
                            source={{uri:  this.getThumbnail() }} />
                    </TouchableHighlight>
                </View>
                <NavigateToPost id={this.props.postData.id}/>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}> { this.props.postData.title }</Text>
                </View>
                {
                    this.getMetadata().map((data) => {
                        return <View key={data.id}>
                                    <MetadataDisplay metadata={data}/>
                                </View>
                        })
                 }
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