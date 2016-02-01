/**
 * Created by mmasuyama on 1/7/2016.
 */
var React = require('react-native');
var {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight

    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var styles = StyleSheet.create({
    image: {
        height: 20,
        width: 20,
        borderRadius: 50,
        //marginTop: 5,
        alignSelf: 'flex-end'
    },
    avatarContainer: {
        flex:1,
        flexDirection: "row",
        justifyContent: "center"
    },
    avatarName: {
        marginVertical : 3,
        marginLeft: 5,
        color: '#b3b3b3'
    }

});

var Avatar = React.createClass({

    navigateToAuthor() {
        var subject= require("../../services/NavigationManager").getStream();
        subject.onNext({path: 'profile', params: {id: this.props.author.id }})
    },

    render() {

        var parsePhotoUrl = function (photoUrl) {
            if(photoUrl.indexOf("http") == -1) {
                photoUrl = "http:" + photoUrl
            }

            return photoUrl;
        };

        var _photo = (this.props.author.avatar) ? parsePhotoUrl(this.props.author.avatar) : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y";
        return (
            <TouchableHighlight onPress={this.navigateToAuthor}>
                <View style={styles.avatarContainer}>
                    <Image  style={styles.image} source={{uri: _photo }} />
                    <Text style={styles.avatarName}>
                        {this.props.author['name']}
                    </Text>
                </View>
            </TouchableHighlight>

        )
    }
});

Avatar.propTypes = {
    author: React.PropTypes.object
};
module.exports = Avatar;