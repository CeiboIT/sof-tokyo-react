/**
 * Created by mmasuyama on 1/7/2016.
 */
var React = require('react-native');
var {
    Text,
    View,
    Image,
    StyleSheet
    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var styles = StyleSheet.create({
    image: {
        height: 25,
        width: 25,
        borderRadius: 65,
        marginTop: 5,
        alignSelf: 'flex-end'
    },

    avatarContainer: {
        flex:1,
        flexDirection: "row",
        justifyContent: "center"
    },

    avatarName: {
        marginVertical : 6.25,
        marginLeft: 3
    }

});

var Avatar = React.createClass({
    render() {

        var parsePhotoUrl = function (photoUrl) {
            if(photoUrl.indexOf("http") == -1) {
                photoUrl = "http:" + photoUrl
            }

            return photoUrl;
        };

        var _photo = (this.props.author.avatar) ? parsePhotoUrl(this.props.author.avatar) : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y";
        return (
            <View style={styles.avatarContainer}>
                <Image  style={styles.image} source={{uri: _photo }} />
                <Text style={styles.avatarName}>
                    {this.props.author['displayname']}
                </Text>
            </View>
        )
    }
});

Avatar.propTypes = {
    author: React.PropTypes.object,
    metadata: React.PropTypes.object
};
module.exports = Avatar;