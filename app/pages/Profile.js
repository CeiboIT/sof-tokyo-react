/**
 * Created by epotignano on 12/01/16.
 */
var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");
var GridView = require('react-native-grid-view');
import TabNavigator from 'react-native-tab-navigator';

var Badge = require('../components/user/Badge');

var api = require('../utils/api/UserApi');
var PostElement = require('../components/posts/PostElement');
var Icon = require('react-native-vector-icons/FontAwesome');
var EvilIcon = require('react-native-vector-icons/EvilIcons');

var I18nService = require('../i18n');
I18nService.set('ja-JP',{
    'startPosting': "あなたの作品を投稿しましょう！",
    'createPost': "作品投稿",
    'logout': 'ログアウト',
    'name': '名',
    'lastname': '苗字',
    'nickname': 'ニックネーム',
    'url': 'url',
    'description': '説明'
});

var I18n = I18nService.getTranslations();

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get("window");

var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    infoUser: {
        marginTop: 20,
        marginLeft: 20,
        height: windowSize.height
    },
    text: {
        color: '#444444',
        fontSize: 14,
        marginLeft: 5,
        paddingTop: 15
    },
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
            console.warn('profile > didmount ', JSON.stringify(data));
            if (data.type != 'logout') {
                this.setState({
                    user:data.data.author,
                    posts:data.data.posts || [],
                    isLoading: false,
                    selectedTab: 'posts'
                })
            }
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


    createNewPost() {

    },

    logout() {
        var NavigationSubject = require("../services/NavigationManager").getStream();
        api.logout()
            .then(() => {
                console.warn('Profile > logout');
                NavigationSubject.onNext({path: 'feed'})
            })
            .catch((error) => {
                console.warn('Profile > logout error');
            });
    },

    render() {


        var _grid = <GridView
                style={{height: _dynamicHeight}}
                items={this.state.posts}
                itemsPerRow={2}
                renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData } />}
            />

        var _ownerGrid = (!!this.state.posts.length) ? _grid : null;
        var _visitorGrid = (!!this.state.posts.length) ? _grid : null;
        var _firstPost = (!this.state.posts.length) ? <Text> {I18n.t('startPosting') }</Text>: null;

        var _ownerTab = (
           <TabNavigator 
                sceneStyle={{ height: postElement.height - 50 }}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'posts'}
                    renderIcon={() => <View><Icon name="files-o" size={20}/></View>}
                    renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                    onPress={() => this.setState({ selectedTab: 'profileData' })}>
                    <ScrollView style={{height: 500}}>
                        {_firstPost}
                        <View>
                            <TouchableHighlight onPress={this.createNewPost}>
                                <Text> { I18n.t("createPost") } </Text>
                            </TouchableHighlight>
                        </View>
                        { _ownerGrid }
                    </ScrollView>
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profileData'}
                    renderIcon={() => <View><Icon name="user" size={20}/></View>}
                    renderSelectedIcon={() => <View><Icon name="user" color="#000000" size={20}/></View>}
                    onPress={() => this.setState({ selectedTab: 'profileData' })}>
                    <View style={styles.infoUser}>
                        <Text style={styles.text}> {I18n.t('name')}: {this.state.user.name}</Text>
                        <Text style={styles.text}> {I18n.t('lastname')}: {this.state.user.last_name}</Text>
                        <Text style={styles.text}> {I18n.t('nickname')}: {this.state.user.nickname}</Text>
                     	<Text style={styles.text}> {I18n.t('url')}: {this.state.user.url}</Text>
					    <Text style={styles.text}> {I18n.t('description')}: {this.state.user.description}</Text> 
                        <TouchableHighlight style={{paddingTop: 20}} onPress={this.logout} underlayColor={'transparent'}>
                          <View>
                              <Icon name="sign-out" style={styles.text}> <Text>{I18n.t('logout')}</Text></Icon>
                          </View>
                        </TouchableHighlight>
                    </View>
                </TabNavigator.Item>

            </TabNavigator>
        );

        var _dynamicHeight = 0;

        if(this.state.posts && this.state.posts.length) {
            _dynamicHeight = postElement.height * Math.abs( this.state.posts.length / 2)
        }

        var _visitorTab = (
                <TabNavigator
                    sceneStyle={{ height: postElement.height - 50 }}
                >
                    <TabNavigator.Item
                        selected={ this.state.selectedTab === 'posts' }
                        renderIcon={() => <View><Icon name="files-o" size={20} color="#bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedPosts}
                    >
                        <ScrollView style={{height: 500}}>
                            { _visitorGrid }
                        </ScrollView>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <View><Icon name="bell-o" size={20} color="#bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="bell-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedHome}
                        >
                        <View style={styles.infoUser}>
                            <Text style={styles.text}> {I18n.t('name')}: {this.state.user.name}</Text>
                            <Text style={styles.text}> {I18n.t('lastname')}: {this.state.user.last_name}</Text>
                            <Text style={styles.text}> {I18n.t('nickname')}: {this.state.user.nickname}</Text>
                         	<Text style={styles.text}> {I18n.t('url')}: {this.state.user.url}</Text>
						    <Text style={styles.text}> {I18n.t('description')}: {this.state.user.description}</Text> 
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>

        );

        var _render = (this.props.owner) ? _ownerTab : _visitorTab;
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