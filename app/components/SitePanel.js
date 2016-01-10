/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var NavigationSubject= require("../stores/Streams").getStream("Navigation");
var SidebarSubject = require("../stores/Streams").getStream("Sidebar");

import Button from 'apsl-react-native-button'

var {
    View,
    StyleSheet
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
        flexDirection: 'column'
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


class SitePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            User: {},
            navigating: false
        }
    }

    login() {
        NavigationSubject.onNext('login');
        SidebarSubject.onNext('close');
        return;
    }


    render(){

        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer} collapse={ true } >
                    <Button style={styles.login} textStyle={styles.loginText} onPress={this.login}>
                        Login
                    </Button>
                    <Button style={styles.register} textStyle={styles.registerText}>
                        Register
                    </Button>
                </View>
            </View>
        )
    }
}

SitePanel.StateProps = {
    User : React.PropTypes.object
};

module.exports = SitePanel;