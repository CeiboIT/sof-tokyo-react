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
var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/FontAwesome');

var ResponsiveImage = require('react-native-responsive-image');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },

    tabLabelContainer : {
        flex: 1,
        borderBottomWidth: 3

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

var goToPost = function (rowData) {
    var subject= require("../services/NavigationManager").getStream();
    subject.onNext({path:'post', params: {id: rowData.id} })
}


var ElementDisplayer = React.createClass({

    render() {
        return (
            <View styles={styles.postContainer}>
                <TouchableHighlight onPress={goToPost(this.props.data)} >
                    <ResponsiveImage source={{uri: this.props.data.thumbnail}}
                                     initWidth={postImage.width} initHeight={postImage.height}/>
                </TouchableHighlight>
            </View>
        )
    }

})

ElementDisplayer.propTypes = {
    data: React.PropTypes.object
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
        this.getUserData(this.props.id);
        UserStream.subscribe((data) => {
            if(this.props.id == 'me') {
                this.setState({
                    user: data.data,
                    isLoading:false,
                    selectedTab: 'home'
                })
            } else {
                this.setState({
                    user:data.data.author,
                    posts:data.data.posts,
                    isLoading: false,
                    selectedTab: 'posts'
                })
            }
        })
    },

    getUserData(id) {
        if(id == 'me'){
            storage.load({key: 'UserId'})
            .then((ret) => {
                api.getUser(ret.data)
            })
        } else {
            api.getMember(id);
        }
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
            <View>
                <TabNavigator>
                    <TabNavigator.Item
                        style={styles.tabLabelContainer}
                        selected={this.state.selectedTab === 'profileData'}
                        renderIcon={() => <View><Icon name="user" size={20}/></View>}
                        renderSelectedIcon={() => <View><Icon name="bell-o" color="#FFF000" size={20}/></View>}
                        onPress={() => this.setState({ selectedTab: 'profileData' })}>
                        <Text>AyVida!</Text>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        style={styles.tabLabelContainer}
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <View><Icon name="bell-o" size={20}/></View>}
                        renderSelectedIcon={() => <View><Icon name="bell-o" color="#FFF000" size={20}/></View>}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <Text>Hola</Text>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );


        var _visitorTab = (
            <View>
                <TabNavigator>
                    <TabNavigator.Item
                        style={styles.tabLabelContainer}
                        selected={ this.state.selectedTab === 'posts' }
                        renderIcon={() => <View><Icon name="files-o" size={20} color="##bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedPosts}
                    >
                        <Text>Holis</Text>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        style={styles.tabLabelContainer}
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <View><Icon name="bell-o" size={20} color="#bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="bell-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedHome}
                        >
                        <Text>Hola</Text>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
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