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
    StyleSheet
    } = React;

var styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height*0.25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
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
    render() {
        return(
            <View>
          {
              this.props.bannerData.map(function(banner) {
                return <View key={banner.id}>{banner.post_content}</View>
              })
          }  
            </View>
            
        )
    }
});

// <View style={styles.container}>
//                 <ResponsiveImage source={{uri: this.getImage()}}
//                                  initWidth={screen.width} initHeight={imageSizes.height} />
//             </View>

BannerElement.propTypes = {
    bannerData: React.PropTypes.object
};

module.exports = BannerElement;