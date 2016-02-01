/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var NavigationSubject= require("../../services/NavigationManager").getStream();
var SidebarSubject = require("../../services/Streams").getStream("Sidebar");

var {
    View,
    StyleSheet,
    TouchableHighlight,
    Text
    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');


var styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        flexDirection: 'column',
    },

    login: {
        borderColor: '#00b9f7',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3
    },

    loginText: {
        color:"#00b9f7",
        fontSize: 25
    },

    registerText: {
        color:"#8e44ad",
        fontSize: 25
    },
    register: {
        borderColor: '#8e44ad',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3
    }
});


var SitePanel = React.createClass ({


    login() {
        NavigationSubject.onNext({path: 'login'});
        SidebarSubject.onNext('close');
        return;
    },

    closeSidePanel() {
        SidebarSubject.onNext('close');
    },

    navigateToAbout() {
        NavigationSubject.onNext({path: 'aboutSof'})
        SidebarSubject.onNext('close');
    },

    navigateToUploadImage() {
        NavigationSubject.onNext({path: 'uploadImage'})
    },

    navigateToSchools() {
        NavigationSubject.onNext({path: 'schools'})
        SidebarSubject.onNext('close');
    },

    render(){

        return (
            <View style={styles.container}>

                <View>
                    <TouchableHighlight onPress={this.closeSidePanel}>
                        <Text>X</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.buttonsContainer} collapse={ true } >
                    <TouchableHighlight ><Text>WOMEN</Text></TouchableHighlight>
                    <TouchableHighlight ><Text>MEN</Text></TouchableHighlight>
                    <TouchableHighlight ><Text>STYLE</Text></TouchableHighlight>
                    <TouchableHighlight ><Text>CATEGORY</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.navigateToSchools}><Text>SCHOOL</Text></TouchableHighlight>
                    <TouchableHighlight ><Text>CONTACT</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.navigateToAbout}><Text>ABOUT Sof</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.navigateToUploadImage}><Text>UploadImage</Text></TouchableHighlight>
        </View>
            </View>
        )
    }
});

SitePanel.StateProps = {
    User : React.PropTypes.object
};

module.exports = SitePanel;