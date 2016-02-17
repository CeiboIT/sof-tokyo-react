var React = require('react-native');
var PostElement = require('./PostElement');
var GridView = require('react-native-grid-view');
var PostsStream = require("../../services/Streams").getStream("Posts");
var GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    TouchableHighlight,
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

    item: {

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
    },
    loadMore : {
        borderColor: "#8a52ad",
        borderWidth: 1,
        padding: 5,
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    loadMoreText : {
        color: "#8a52ad"
    }
});
// In the video there are a couple errors, fixed them so it would build.

var _page = 1;

var PostsList  = React.createClass({
    getInitialState() {
        return {
            dataSource: [],
            page: 1,
            isLoading: true,
            initial: true,
            infiniteScroll: false
        };
    },

    componentDidMount() {
        var _initial = true;

        if(this.props.id) {
            this.props.loadPostsFn(this.props.id)
        } else {
            this.props.loadPostsFn()
        }

        PostsStream.subscribe((response) => {
            if(_initial && _page == 1)  {
                _initial = false;
                if(response.pages != 1) {
                    this.setState({
                        infiniteScroll: true
                    })
                }

                if(response['posts']) {
                    this.setState({
                        dataSource: response['posts'],
                        isLoading: false
                    });
                }
            } else {
                if(response['posts']) {
                    var _posts = this.state.dataSource;
                    response['posts'].forEach((post) => {
                        _posts.push(post);
                    });

                    this.setState({
                        dataSource: _posts
                    })
                }
            }

        });


    },

    loadMorePosts(){
        if( this.state.infiniteScroll ) {
            _page = _page + 1;
            if(this.props.id) {
                this.props.loadPostsFn(this.props.id, _page);
            } else {
                this.props.loadPostsFn(_page);
            }
        }
    },
    render(){

        var _loadMoreButton = (
            <TouchableHighlight underlayColor={'transparent'} onPress={this.loadMorePosts} style={styles.loadMore}>
                <Text style={styles.loadMoreText}> Load more posts </Text>
            </TouchableHighlight>
        );

        var _renderLoadButton = (this.state.infiniteScroll) ? _loadMoreButton : null;

        var _grid = (
            <ScrollView>
                <GridView
                    items={this.state.dataSource}
                    itemsPerRow={this.props.elementsPerRow}
                    renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData } />}
                    style={{
                        backgroundColor: '#F7F7F7'
                    }}
                />
                { _renderLoadButton }
            </ScrollView>
         )

        var _loading = (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7F7F7'
              }}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.dataSource && this.state.dataSource.length) ? _grid : _loading;
        return _render
    }
})

PostsList.propTypes = {
    loadPostsFn : React.PropTypes.func,
    elementsPerRow : React.PropTypes.number,
    id : React.PropTypes.any
}

module.exports = PostsList;