/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');

var {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    }
});

class PostElement extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Image source={{uri: this.props.postData.thumbnail}}
                       style={{width: 300, height:600}}
                />
                <View>
                    <Text style={styles.title}> { this.props.postData.title}</Text>
                </View>

                <View>
                </View>
            </View>
        )
    }
}

PostElement.propTypes = {
    postData: React.PropTypes.object
};


module.exports = PostElement;