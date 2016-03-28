var React = require('react-native'),
    Dimensions = require('Dimensions'),
    screen = Dimensions.get('window');

var {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({

});

var BannerElement = React.createClass({
    getImage () {
        var imgRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g,
            content = this.props.bannerData.post_content,
            img = imgRegex.exec(content);
        if(img && img[1]){
            return img[1];
        }else{
            return 'http://sof.tokyo/wp-content/uploads/2015/06/logo.png';
        }
    },
    goToNew () {
        var subject= require("../../services/NavigationManager").getStream();
        subject.onNext({path:'news', params: {id: this.props.bannerId} })
    },
    imgageSize () {
        var height = null;
        (screen.width <= 360) ? height = screen.height*0.25 : height = screen.height*0.4;
        return height  
    },
    render() {
        return(
            <TouchableHighlight underlayColor={'transparent'} onPress={ this.goToNew }>
                <View style={{paddingHorizontal:10}}>
                   <Image style={{width:screen.width, height: this.imgageSize()}}
                       source={{uri:  this.getImage() }} resizeMode="stretch" />
                </View>
            </TouchableHighlight>
        )
    }
});

BannerElement.propTypes = {
    bannerData : React.PropTypes.object,
    bannerId : React.PropTypes.number
};

module.exports = BannerElement;