var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window");
    
var {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight

    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    image: {
        height: 20,
        width: 20,
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    imageLarge: {
        height: 40,
        width: 40,
        borderRadius: 50,
        alignSelf: 'flex-start'
    },
    avatarContainer: {
        flex: 1,
        flexDirection: "row"
    },
    avatarName: {
        marginVertical : 0,
        marginLeft: 5,
        color: '#b3b3b3'
    },
    avatarNameLarge : {
        marginLeft: 5,
        color: '#b3b3b3',
        fontWeight : 'bold'
    }

});

var Avatar = React.createClass({

    navigateToAuthor() {
        var subject= require("../../services/NavigationManager").getStream();
        subject.onNext({path: 'profile', params: {id: this.props.author.id }})
    },

    render() {

        var parsePhotoUrl = function (photoUrl) {
            if(photoUrl.indexOf("http") == -1) photoUrl = "http:" + photoUrl;

            return photoUrl;
        };

        var _photo = (this.props.author.avatar) ? parsePhotoUrl(this.props.author.avatar) : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y";
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={this.navigateToAuthor} style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Image style={(this.props.size === 'large') ? styles.imageLarge : styles.image} source={{uri: _photo }} />
                    <Text style={(this.props.size === 'large') ? styles.avatarNameLarge : styles.avatarName}>
                        {this.props.author['name']}
                    </Text>
                </View>
            </TouchableHighlight>

        )
    }
});

Avatar.propTypes = {
    author: React.PropTypes.object,
    size: React.PropTypes.string
};
module.exports = Avatar;