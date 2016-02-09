/**
 * Created by mmasuyama on 1/7/2016.
 */

/** IMPORTANTE

Every load function has to use PostsStream
*/

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
        if(this.props.id) {
            this.props.loadPostsFn(this.props.id)
        } else {
            this.props.loadPostsFn()
        }

        PostsStream.subscribe((response) => {
            if(this.state.initial && _page == 1  && !this.state.isLoading)  {
                if(response.pages != _page) {
                    this.setState({
                        infiniteScroll: true,
                        initial : false
                    })
                } else {
                    this.setSate({
                        infiniteScroll:false
                    })
                }
                this.setState({
                    dataSource: response['posts'],
                    isLoading: false
                });
            } else {

                var _posts = this.state.dataSource;
                response['posts'].forEach((post) => {
                        _posts.push(post);
                });

                this.setState({
                    dataSource: _posts
                })
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

                <TouchableHighlight onPress={this.loadMorePosts}>
                    <Text> Load more posts </Text>
                </TouchableHighlight>
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

        var _render = (this.state.dataSource && this.state.dataSource.length) ? _grid : _loading
        return _render
    }
})

PostsList.propTypes = {
    loadPostsFn : React.PropTypes.func,
    elementsPerRow : React.PropTypes.number,
    id : React.PropTypes.number
}

module.exports = PostsList;