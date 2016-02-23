var React = require('react-native'),
    Icon = require('react-native-vector-icons/FontAwesome');

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
    },
    views : {
        
    }
})

var regex = /(<([^>]+)>)/ig,
    eyeIcon = <Icon name="signal" size={18}/>;

var PostContentDisplayer = React.createClass({
    render() {

        var _content = this.props.content;
        
        if(!!_content) {
            
            if(this.props.removeHTMLTags) {
                _content = this.props.content.replace(regex, "").replace(/\s\s+/g, ' ');
            }

            if(this.props.crop) {
                _content = _content.substring(0,this.props.crop) + "..."
            }
        } else {
            _content= ""
        }
        
        if(this.props.views){
            var _numOfViews = ' Post Views: ' + _content.substr(_content.indexOf("Post Views:") + 12);
            _content = _content.split('Post Views')[0] + '\n\n';
        }

        return (
            <View style={styles.content}>
                <Text style={styles.text}>
                    {_content}
                    <Text style={styles.views}>
                        {this.props.views ? eyeIcon : ''}
                        {this.props.views ? _numOfViews : ''}
                    </Text>
                </Text>
            </View>
        )
    }
})

PostContentDisplayer.propTypes = {
    content : React.PropTypes.string,
    removeHTMLTags : React.PropTypes.bool,
    views : React.PropTypes.bool,
    crop : React.PropTypes.number
}

module.exports = PostContentDisplayer;