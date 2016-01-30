/**
 * Created by epotignano on 19/01/16.
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/EvilIcons');
var api = require('../../../utils/api/PostApi')

var {
    View,
    Text,
    StyleSheet
    } = React;

var styles = StyleSheet.create({
    content : {
        padding: 5
    },
    text : {
      color: '#777777'  
    },
    postLikeContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})
var regex = /(<([^>]+)>)/ig;
var regexViews = /^Post Views\:(.*)$/gm;

var PostContentDisplayer = React.createClass({
    render() {

        var _content = this.props.content;
        
        if(!!_content) {

            if(this.props.removeHTMLTags) {
                _content = this.props.content.replace(regex, "");
            }

            if(this.props.crop) {
                _content = _content.substring(0,this.props.crop) + "..."
            }
        } else {
            _content= ""
        }
        // console.warn(_content)
        // var myRegexp = /Views(.*)/;
        // var _match = myRegexp.exec(_content)
        // if(_match) {
        //     console.warn(_match[1]);
        // }

        return (
            <View style={styles.content}>
                <Text style={styles.text}>
                    {_content}
                </Text>
            </View>
        )
    }
})

PostContentDisplayer.propTypes = {
    content : React.PropTypes.string,
    removeHTMLTags : React.PropTypes.bool,
    crop : React.PropTypes.number
}

module.exports = PostContentDisplayer;