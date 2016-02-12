/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var Rx = require('rx');
var GridView = require('react-native-grid-view');
var communication = require('../utils/api/CommunicationApi');
var Icon = require('react-native-vector-icons/FontAwesome');

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ScrollView
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        height:windowSize.height
    },

    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },

    tabViewContainer : {
        flex:1,
        flexDirection: 'column',
        alignItems: 'stretch',
        height: windowSize.height
    },

    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },


    postContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: windowSize.width * 0.4
    },


});
var postImage = {
    width: windowSize.width * 0.2,
    height: windowSize.height * 0.35
};

var postElement = {
    height: windowSize.height * 0.8
}

var goToPost = function (rowData) {
    var subject= require("../services/NavigationManager").getStream();
    subject.onNext({path:'post', params: {id: rowData.id} })
}



var Profile = React.createClass({

    getInitialState() {
        return {
            posts: [],
            isLoading: true,
            stream: new Rx.Subject()
        }
    },

    componentDidMount() {

    },

    render() {



        return(
            <ScrollView　style={styles.container}>
                <View>
                    <TouchableHighlight
                        underlayColor={'transparent'}
                        style={styles.button}
                        onPress={this.requestSchoolBook}>
                        <Text>Request Book</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
});

Profile.propTypes = {
    id : React.PropTypes.any
};

module.exports = Profile;