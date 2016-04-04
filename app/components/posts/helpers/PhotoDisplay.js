var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window");

var {Image, StyleSheet, TouchableHighlight} = React;

var styles = StyleSheet.create({
    thumbnail : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

var PhotoDisplay = React.createClass({
    imageSize () {
        if( this.props.post && this.props.post.thumbnail_images && this.props.post.thumbnail_images['post-thumbnail']) {
            if(windowSize.scale == 3){
                size = {
                    width: this.props.post.thumbnail_images['post-thumbnail'].width / (windowSize.scale * 1.25),
                    height: this.props.post.thumbnail_images['post-thumbnail'].height / (windowSize.scale * 1.25)
                };
            }else{
                size = {
                    width: this.props.post.thumbnail_images['post-thumbnail'].width / (windowSize.scale * 2),
                    height: this.props.post.thumbnail_images['post-thumbnail'].height / (windowSize.scale * 2)
                };
            }
        }
        
        if(windowSize.width * 0.5 > size.width){
            var diff = windowSize.width * 0.5 - size.width;
            size.height += diff;
            size.width += diff;
        }
        
        return size
    },
    getThumbnail () {
        if(this.props.post) {
            if( this.props.post.thumbnail_images && this.props.post.thumbnail_images['post-thumbnail']){
                return this.props.post.thumbnail_images['post-thumbnail'].url
            }else{
                if(this.props.post.custom_fields.sofbackend__sof_work_meta__postImage){
                    return '"' + this.props.post.custom_fields.sofbackend__sof_work_meta__postImage[0]+ '"';
                }else{
                    return ''
                }
            }
        }
    },

    render() {
        return(
            <TouchableHighlight underlayColor={'rgba(0,0,0,0.9)'} onPress={ this.props.onClick } style={styles.thumbnail}>
                <Image style={[this.imageSize()]}
                       source={{uri:  this.getThumbnail() }} resizeMode="stretch" />
            </TouchableHighlight>
        )
    }
});

PhotoDisplay.propTypes = {
    post: React.PropTypes.object,
    onClick : React.PropTypes.any
};


module.exports = PhotoDisplay;