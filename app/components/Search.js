/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var api =require("../utils/api/UserApi");



var {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
    } = React;


var styles = {
    Search: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#777777'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
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


class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isLoading: false,
            error: false
        };
    }

    handleChange(event){
        this.setState({
            search: event.nativeEvent.text
        })
    }

    handleSubmit(){
        // update our indicatorIOS spinner
        this.setState({
            isLoading: true
        });
        console.log(this.state);
        api.getBio(this.state.search)
            .then((res)=> {
                console.log(res);
                if(res.message == 'Not Found') {
                    this.setState({
                    error: 'User was not found',
                    isLoading: false
                    })
                } else {
                    console.log('Inside the prop!!!');
                    this.props.navigator.push({
                        id: 'MainPage',
                        userdata : res
                    });

                    this.setState({
                        isLoading: false,
                        error: false,
                        username: ''
                    })
                }

            })

    }

    render() {
        return(
            <View style={styles.Search}>
                <Text style={styles.title}> Search in SOF </Text>
                <Text style={styles.title}> { this.state.error}</Text>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleChange.bind(this)} />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                    <Text style={styles.buttonText}> SEARCH </Text>
                </TouchableHighlight>
            </View>

        );
    }
}

module.exports = Search;