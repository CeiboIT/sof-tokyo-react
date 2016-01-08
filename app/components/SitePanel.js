/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

import Button from 'apsl-react-native-button'

var {
    SwitchIOS,
    View,
    Text,
    StyleSheet

    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    }
});

var styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
            User: {}
        }
    }

    render(){

        if(true) {
            styles.buttonsContainer.opacity = 0;
        }

        return (
            <View>
                <View style={styles.buttonsContainer} collapse={ true } >
                    <Button style={styles.login} textStyle={styles.loginText}>
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