/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var UserAPI = require('../utils/API');

var {
    Text,
    View,
    Image,
    StyleSheet
    } = React;

var styles = StyleSheet.create({
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});


class Badge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: {}
        }
    };

    getUserAvatar(userId){
        UserAPI.getAvatar(userId).then((data)=> {
            this.setState({
                avatar: data
            });
        })
    }

    render(){
        return (
            <View>
                <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
            </View>
        )
    }
}

Badge.propTypes = {
    userId: React.PropTypes.object
}


module.exports = Badge;