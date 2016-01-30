/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");
var GridView = require('react-native-grid-view');
import TabNavigator from 'react-native-tab-navigator';

var Badge = require('../components/user/Badge');

var api = require('../utils/api/UserApi');
var storage = require('../services/Storage').getInstance();
var PostElement = require('../components/posts/PostElement');
var Icon = require('react-native-vector-icons/FontAwesome');


var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

var {
    View,
    Text,
    StyleSheet,
    ScrollView
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        height:windowSize.height
    },


    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    tabViewContainer : {
        flex:1,
        flexDirection: 'column',
        alignItems: 'stretch',
        height: windowSize.height
    },


    postContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: windowSize.width * 0.4
    },


});
var postImage = {
    width: windowSize.width * 0.2,
    height: windowSize.height * 0.35
};

var postElement = {
    height: windowSize.height * 0.8
}

var goToPost = function (rowData) {
    var subject= require("../services/NavigationManager").getStream();
    subject.onNext({path:'post', params: {id: rowData.id} })
}



var Profile = React.createClass({

    getInitialState() {
        return {
            user: {},
            posts: [],
            isLoading: true
        }
    },

    componentDidMount() {
        api.getMember(this.props.id);
        UserStream.subscribe((data) => {
            this.setState({
                user:data.data.author,
                posts:data.data.posts || [],
                isLoading: false,
                selectedTab: 'posts'
            })
        })
    },

    selectedPosts() {
      this.setState({
          selectedTab : 'posts'
      })
    },

    selectedHome() {
        this.setState({
            selectedTab : 'home'
        })
    },


    render() {

        var _ownerTab = (
           <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profileData'}
                    renderIcon={() => <View><Icon name="user" size={20}/></View>}
                    renderSelectedIcon={() => <View><Icon name="bell-o" color="#FFF000" size={20}/></View>}
                    onPress={() => this.setState({ selectedTab: 'profileData' })}>
                    <Text>Test!</Text>
                </TabNavigator.Item>

                <TabNavigator.Item

                    selected={this.state.selectedTab === 'home'}
                    renderIcon={() => <View><Icon name="bell-o" size={20}/></View>}
                    renderSelectedIcon={() => <View><Icon name="bell-o" color="#FFF000" size={20}/></View>}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <Text>Hola</Text>
                </TabNavigator.Item>
            </TabNavigator>
        );

        var _dynamicHeight = 0;

        if(this.state.posts && this.state.posts.length) {
            _dynamicHeight = postElement.height * Math.abs( this.state.posts.length / 2)
        }

        console.warn(_dynamicHeight);

        var _visitorTab = (
                <TabNavigator
                    sceneStyle={{ height: postElement.height - 50 }}
                >
                    <TabNavigator.Item
                        selected={ this.state.selectedTab === 'posts' }
                        renderIcon={() => <View><Icon name="files-o" size={20} color="##bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedPosts}
                    >
                        <ScrollView style={{height: 500}}>
                            <GridView
                                style={{height: _dynamicHeight}}
                                items={this.state.posts}
                                itemsPerRow={2}
                                renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData } />}
                            />
                        </ScrollView>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <View><Icon name="bell-o" size={20} color="#bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="bell-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedHome}
                        >
                        <Text>Test</Text>
                    </TabNavigator.Item>
                </TabNavigator>

        );

        var _render = (this.props.id == 'me') ? _ownerTab : _visitorTab;
        return(

            <View>
                <Badge data={this.state.user} />
                {_render}
            </View>
        );
    }
});

Profile.propTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;