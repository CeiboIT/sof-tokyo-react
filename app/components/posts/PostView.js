/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

var ResponsiveImage = require('react-native-responsive-image');
var Icon = require('react-native-vector-icons/FontAwesome');
var NavigatorSubject = require("../../services/NavigationManager")

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: windowSize.width * 0.4
    },
    title: {
        fontSize: 15
    },

    navIconContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: windowSize.width * 0.4,
        marginVertical:5
    },

    navIcon: {

    }

});


var imageSizes ={

    width: windowSize.width * 0.45,
    height: windowSize.height * 0.6

};


class NavigateToPost extends React.Component {
    constructor(props) {
        super(props);
    }

    tap () {
        NavigatorSubject.onNext('post', this.props.id)
    }

    render() {
        return (
            <TouchableHighlight onTap={this.tap} style={styles.navIconContainer}
                                underlayColor="transparent">
                <Icon name="plus" size={10} color="#000"></Icon>
            </TouchableHighlight>
        )
    }
}

NavigateToPost.propTypes= {
    id: React.PropTypes.number
};

class PostElement extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View>
                    <ResponsiveImage source={{uri: this.props.postData.thumbnail}}
                                     initWidth={imageSizes.width} initHeight={imageSizes.height}
                    />
                </View>
                <NavigateToPost id={this.props.postData.id}></NavigateToPost>
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