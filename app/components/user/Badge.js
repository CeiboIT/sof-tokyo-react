var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window"),
    ParallaxView = require('react-native-parallax-view');

var {
    Text,
    View,
    Image,
    StyleSheet
} = React;

var styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF'
    },

    headerSection : {
        height: windowSize.height * 0.27,
        width : windowSize.width,
        backgroundColor: "#3f3f3f"
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

    badge: {
        borderRadius: 40,
        width: 80,
        height: 80,
        marginTop: windowSize.height * 0.025 ,
        left: windowSize.width / 2 - 40,
        borderWidth: 6,
        borderColor: "#f7f7f7"
    }
});

class Badge extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var parsePhotoUrl = function (photoUrl) {
            if(photoUrl.indexOf("http") == -1) {
                photoUrl = "http:" + photoUrl
            }

            return photoUrl;
        }

        var _photo = (this.props.data && this.props.data.avatar) ? parsePhotoUrl(this.props.data.avatar) : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y";
 		return (
			<View style={styles.headerSection}>
			    <Image style={styles.badge} source={{uri: _photo }}/>
			</View>
        )
    }
}
/* 
<ParallaxView styles={styles.headerSection}
        backgroundSource={{}}
        windowHeight={windowSize.height * 0.2}
        blur="dark"
        header={(<Image style={styles.badge} source={{uri: _photo }}/>)} >
        <View style={styles.container}>
            <Text style={styles.name}> { this.props.data.displayname } </Text>
        </View>
    </ParallaxView>
{{uri:null}} */
Badge.stateProps = {
    data: React.PropTypes.object
};

module.exports = Badge;