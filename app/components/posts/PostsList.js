/* global , */
/**
 * Created by mmasuyama on 1/7/2016.
 */
var React = require('react-native');
var apiPosts = require('../../utils/api/PostsApi');

var PostElement = require('./PostElement');
var GridView = require('react-native-grid-view');
var PostsStream = require("../../services/Streams").getStream("Posts");
var GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    Text,
    ScrollView
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'        
    },

    title: {
        fontSize: 25
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },

    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

var PostsList  = React.createClass({
    getInitialState() {
        return {
            dataSource: [],
            note: '',
            error: '',
            page: 1,
            isLoading: true
        };
    },

    componentDidMount() {
        apiPosts.LoadPosts(this.page)
        PostsStream.subscribe((response) => {
            this.setState({
                dataSource: response['posts']
            });
        });
    },
    render(){

        var _grid = (
            <ScrollView>
                <View>
                    <GridView
                        items={this.state.dataSource}
                        itemsPerRow={2}
                        renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData } />}
                        style={{
                            backgroundColor: '#F7F7F7'
                        }}
                    />
                </View>
            </ScrollView>
            )

        var _loading = (
            <View style={styles.loading}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.dataSource && this.state.dataSource.length) ? _grid : _loading
        return _render
    }
})

module.exports = PostsList;