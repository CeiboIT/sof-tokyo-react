/**
 * Created by mmasuyama on 1/7/2016.
 */


var React = require('react-native');
var Dimensions= require('Dimensions');
var windowSize = Dimensions.get("window");
var api = require('../../utils/api/PostsApi');
var PostElement = require('./PostElement');
var PostView = require('./PostView');
var Login = require('./../auth/Login');

var GridView = require('react-native-grid-view');
var NavigatorManager = require("./NavigationManager");

var {
    StyleSheet
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

    facebookHeader : {
      backgroundColor: "#2A406B"
    },

    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
// In the video there are a couple errors, fixed them so it would build.

class PostsList extends React.Component{
    constructor(props){
        super(props);
        //Because this is the first route,it should set the navigationManager;

        NavigatorManager.setNavigationManager(props.navigator);

        this.state = {
            dataSource: [],
            note: '',
            error: '',
            page: 1
        };

        this.getDataSource();
    }

    getDataSource(): ListView.DataSource {
        return api.Posts(this.page)
            .then((response) => {
                console.log(Array.isArray(response.posts));
                this.setState({
                    dataSource: response['posts']
                })
            })
    }

    render(){
        return (
        <GridView
            items={this.state.dataSource}
            itemsPerRow={2}
            renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData }></PostElement>}
        />
        )
    }
}

module.exports = PostsList;