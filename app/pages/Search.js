/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var searchApi = require('../utils/api/SearchApi');
var searchStream = require('../services/Streams').getStream("Search");
var I18n = require('../i18n').getTranslations();
var t = require('tcomb-form-native');
import Button from 'apsl-react-native-button'

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
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'black'
    },
    buttonText: {
        fontSize: 18,
        color: '#8a52ad',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#8a52ad',
        borderWidth: 2,
        borderRadius: 0,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
}


var SearchForm= t.struct({
    text : t.maybe(t.String)
})

var SearchOptions = {
    fields: {
        text: {
            label: 'Search'
        }
    }
}

var Form = t.form.Form;

var Search =  React.createClass({

    getInitialState(){
        return {
            isLoading: false,
            error: false
        };
    },

    handleSubmit(){
        // update our indicatorIOS spinner
        var params = this.refs.form.getValue();
        searchApi.products(params);
        searchStream.subscribe((results) =>{
            var NavigationManager = require('../services/NavigationManager').getStream();
            NavigationManager.onNext({path: 'searchResults', params: {data: results.data}})
        })
    },

    render() {
        return(
            <View style={styles.Search}>
                <Form
                    ref="form"
                    type={SearchForm}
                    options={SearchOptions}
                />
                <Button style={styles.button} textStyle={styles.buttonText}
                        onPress={this.handleSubmit}>
                    { I18n.t('search')}
                </Button>
            </View>
        );
    }
})

module.exports = Search;