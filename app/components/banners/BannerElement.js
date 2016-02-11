/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');
var ResponsiveImage = require('react-native-responsive-image');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({

});

var imageSizes ={
    width: screen.width,
    height: screen.height*0.25,
};

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
            <TouchableHighlight underlayColor={'transparent'} onPress={this.goToNew()}>
                <View>
                   <ResponsiveImage source={{uri: this.getImage()}}
                                    initWidth={screen.width} initHeight={[this.imgageSize()]} />
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