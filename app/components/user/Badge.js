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

var styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    }
});


class Badge extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
                <Text style={styles.name}> {this.props.userInfo.name} </Text>
                <Text style={styles.handle}> {this.props.userInfo.login} </Text>
            </View>
        )
    }
}

Badge.propTypes = {
    userInfo: React.PropTypes.object
}


module.exports = Badge;