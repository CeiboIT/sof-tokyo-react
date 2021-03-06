var React = require('react-native');
    PostElement = require('./PostElement'),
    GridView = require('react-native-grid-view'),
    PostsStream = require("../../services/Streams").getStream("Posts"),
    GiftedSpinner = require('react-native-gifted-spinner'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window");

var {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    ScrollView
    } = React;
    
var sectionHeight = (windowSize.width <= 360) ? windowSize.height*0.6 : windowSize.height*0.75;

var styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        height: sectionHeight - 30
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF',
        margin: 10
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
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
        borderColor: "#e5e5e5",
        borderWidth: 1,
        padding: 5,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    loadMoreDisabled : {
        borderColor: "#e5e5e5",
        backgroundColor: "#e5e5f0",
        borderWidth: 1,
        padding: 5,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    loadMoreText : {
        color: "#428bca"
    },

    loadMoreTextSelected : {
        color: "#428bca"
    },
    whiteText : {
        
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
                _page = 1;
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

        if( this.state.infiniteScroll && !this.state.isLoading ) {
            _page = _page + 1;

            this.setState({
                isLoading: true
            });

            if(this.props.id) {
                this.props.loadPostsFn(this.props.id, _page);
            } else {
                this.props.loadPostsFn(_page);
            }
        }
    },

    componentWillUnmount(){
        //console.warn('Going to die!');
    },

    togglePressIn(){
        if(!this.state.isLoading){
            this.setState({
                pressIn: !this.state.pressIn
            });
        }
    },

    pressColor(){
        if(this.state.pressIn) {
            return styles.whiteText
        }
    },
    render(){
        var _buttonStyle = (this.state.isLoading) ? styles.loadMoreDisabled : styles.loadMore,
            _label = (this.state.isLoading) ? 'MORE': 'MORE',
            _underlayColor = (this.state.isLoading) ? 'transparent': '#e5e5f0',
            _loadMoreButton = (
            <TouchableHighlight underlayColor={_underlayColor} onPress={this.loadMorePosts} onPressIn={this.togglePressIn} onPressOut={this.togglePressIn}
                                style={_buttonStyle}>
                <Text style={[styles.loadMoreText, this.pressColor()]}> {_label} </Text>
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
                        backgroundColor: '#F7F7F7',
                        padding: 5
                    }}
                />
                { _renderLoadButton }
            </ScrollView>
        )

        var _loading = (
            <View style={styles.loading}>
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