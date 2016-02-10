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

var NewElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight onPress={this.props.onSelect}>
                    <Text style={styles.items}>{this.props.new.value}</Text>
                </TouchableHighlight>
            </View>
        )
    }
})

NewElement.propTypes = {
    new: React.PropTypes.object,
    onSelect: React.PropTypes.any
}

var News = React.createClass({
    getInitialState() {
        return {
            news: [],
            selectedNews:[]
        }
    },
    navigateToCheckout() {
        var Nav = require("../services/NavigationManager").getStream();
        Nav.onNext({path: 'newsCheckout', params: {news: this.state.selectedNews} })
    },

    selectNew(new) {
        this.state.selectedNews.push(new);
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
                    <TouchableHighlight onPress={this.navigateToCheckout}>
                        <Text style={styles.title}>
                            Request Books
                        </Text>
                    </TouchableHighlight>

                    <GridView
                        style={styles.test}
                        items={this.state.news}
                        itemsPerRow={1}
                        renderItem={(rowData) => <NewElement
                            onSelect={() => this.selectNew(rowData)}
                            key={rowData.value}
                            new={rowData} /> }
                    />
                </View>
            </ScrollView>
        )
    }
});

module.exports = News;

