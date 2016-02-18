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
    },
    whiteText : {
        color: 'white'
    }
});
// In the video there are a couple errors, fixed them so it would build.

var _page = 1,
    _oldContext,
    _actualContext,
    _posts;

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
            var _infiniteScroll;
            if(!_oldContext) {
                _oldContext = response.type
            } else if(_oldContext != response.type) {
                _oldContext = response.type;
                this.setState({
                    dataSource : []
                });
                _initial = true;
                _page =1;
            }
            
            if(_initial && _page == 1 && response.data['posts'].length)  {
                _initial = false;
                if(response.data.pages && response.data.pages != 1) {
                    _infiniteScroll = true;
                }
                _posts = response.data['posts'];
            } else {
                if(response.data['posts'].length && response.data['posts']) {
                    _posts = this.state.dataSource;
                    response.data['posts'].forEach((post) => {
                        _posts.push(post);
                    });
                    _infiniteScroll = true;
                } else {
                    _infiniteScroll = false;
                }
            }

            this.setState({
                dataSource: _posts,
                isLoading: false,
                infiniteScroll: _infiniteScroll
            })
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
    
    togglePressIn(){
        this.setState({
            pressIn: !this.state.pressIn
        });
    },
    
    pressColor(){
        if(this.state.pressIn) {
            return styles.whiteText
        }
    },
    render(){

        var _loadMoreButton = (
            <TouchableHighlight underlayColor={'#8a52ad'} onPress={this.loadMorePosts} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn} style={styles.loadMore}>
                <Text style={[styles.loadMoreText, this.pressColor()]}> Load more posts </Text>
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