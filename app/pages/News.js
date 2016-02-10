var React = require('react-native');

var GridView = require('react-native-grid-view');
var NewsStream = require("../services/Streams").getStream("News");


var api = require("../utils/api/NewsApi");
var communication = require("../utils/api/CommunicationApi");
var GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#F7F7F7'
    },
    container : {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    title : {
        fontWeight : 'bold',
        margin : 10
    },
    items : {
        padding : 5
    }
});

var News = React.createClass({
    getInitialState() {
        return {
            news: []
        }
    },

    componentDidMount() {
        api.LoadNews();
        NewsStream.subscribe((data)=> {
            this.setState({
                news: data['banner']
            })
        })
    },

    render(){
        if(!this.state.news.length) return (<GiftedSpinner/>)
        return(
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                   
                </View>
            </ScrollView>
        )
    }
});

module.exports = News;

