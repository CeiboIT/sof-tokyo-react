/**
 * Created by mmasuyama on 1/7/2016.
 */


var React = require('react-native');
var api = require('../utils/api/PostsApi');
var Separator = require('./Separator');
var PostElement = require('./PostElement');

var {
    View,
    Text,
    ListView,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    },
    list: {
        flex: 1,
        flexDirection: 'column'
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
        padding: 10,
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
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            note: '',
            error: '',
            page: 1
        }
        this.getDataSource();
    }

    getDataSource(): ListView.DataSource {
        return api.Posts(this.page)
            .then((response) => {
                console.log(Array.isArray(response.posts));
                this.setState({
                    dataSource: this.ds.cloneWithRows(response['posts'])
                })
            })
    }

    handleChange(e){
        this.setState({
            note: e.nativeEvent.text
        })
    }
    /*handleSubmit(){
        var note = this.state.note;
        this.setState({
            note: ''
        });
        api.Posts(this.props.userInfo.login, note)
            .then((data) => {
                api.Posts(this.props.userInfo.login)
                    .then((data) => {
                        this.setState({
                            dataSource: this.ds.cloneWithRows(data)
                        })
                    });
            })
            .catch((error) => {
                console.log('Request failed', error);
                this.setState({error})
            });
    }*/


    /* footer(){
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange.bind(this)}
                    placeholder="New Note" />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }*/

    render(){
        return (
            <View style={styles.container}>
                    <ListView style={styles.list}
                              dataSource={this.state.dataSource}
                              renderRow={(rowData) => <PostElement postData={ rowData }></PostElement>}
                    />
            </View>
        )
    }
};

/*
PostsList.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired
} */

module.exports = PostsList;