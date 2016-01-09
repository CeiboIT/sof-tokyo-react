/**
 * Created by mmasuyama on 1/7/2016.
 */

/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Dimensions= require('Dimensions');
var windowsSize = Dimensions.get('window');
import Button from 'apsl-react-native-button'
var api =require("../utils/api/UserApi");
var stream =require("../stores/Streams").getStream("User");


var {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');

var styles = {
    Search: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#0000'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
}

var styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    facebookContainer: {
        backgroundColor: "#2A406B",
        height: windowsSize.height * 0.2,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    facebookButton: {
        flex:1,
        borderColor: '#2A406B',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3,
        width: windowsSize.width * 0.75,
        marginLeft: windowsSize.width * 0.125,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    login: {

        marginTop:10
    },

    loginText: {
        color:"#FFF",
        fontSize: 25
    },
});


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            error: false
        };
    }

    loginWithFacebook() {
        FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
            if (!error) {
                console.log("Login data: ", data);
            } else {
                console.log("Error: ", data);
            }
        })
    }

    login(){
        var credentials : {

            }
        api.sendCredentials(credentials)
    }

    handleUsername(event){
        this.setState({
            username: event.nativeEvent.text
        })
    }
    handlePassword(event){
        this.setState({
            password: event.nativeEvent.text
        })
    }

    handleSubmit(){
        // update our indicatorIOS spinner
        this.setState({
            isLoading: true
        });
    }

    render() {
        console.log('Trying to Render');
        return(
            <View style={styles.Search}>
                <View style={styles.facebookContainer}>
                    <Button style={styles.facebookButton} textStyle={styles.loginText} onPress={this.loginWithFacebook}>
                        <Icon name="facebook" color="#FFF" style={styles.icon} size={30}></Icon> Login with Facebook
                    </Button>
                </View>
                <Text style={styles.title}> { this.state.error}</Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleUsername.bind(this)} />
                <Text
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Username </Text>
                </Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handlePassword.bind(this)} />
                <Text
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> Password </Text>
                </Text>

                <View style={styles.facebookContainer}>
                    <Button style={styles.facebookButton} textStyle={styles.loginText} onPress={this.loginWithFacebook}>
                        Login
                    </Button>
                </View>
            </View>

        );
    }
}

module.exports = Login;