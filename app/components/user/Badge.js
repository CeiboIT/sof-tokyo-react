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

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

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
        color: 'black'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },

    image: {
        width: windowSize.width * 0.45,
        height: windowSize.height * 0.6
    }
});


class Badge extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        var _photo = (this.props.data.avatar) ? "http:" + this.props.data.avatar : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y";
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: _photo }}/>
                <Text style={styles.name}> { this.props.data.email } </Text>
            </View>
        )
    }
}

Badge.stateProps = {
    data: React.PropTypes.object
}


module.exports = Badge;