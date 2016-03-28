var React = require('react-native'),
    UserStream = require("../services/Streams").getStream("User"),
    MemberStream = require("../services/Streams").getStream("Member"),
    GridView = require('react-native-grid-view'),
    Badge = require('../components/user/Badge'),
    api = require('../utils/api/UserApi'),
    PostElement = require('../components/posts/PostElement'),
    Icon = require('react-native-vector-icons/FontAwesome'),
    EvilIcon = require('react-native-vector-icons/EvilIcons'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get("window"),
    I18nService = require('../i18n');

import TabNavigator from 'react-native-tab-navigator';

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

var postImage = {
    width: windowSize.width * 0.2,
    height: windowSize.height * 0.35
};

var postElement = {
    height: windowSize.height * 0.8
}

var {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        height: postElement.height - 180,
    },
    infoUser: {
        marginTop: 10,
        marginLeft: 5,
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
    createPost : {
        backgroundColor: '#00b9f7', 
        borderColor: "#e5e5e5",
        borderWidth: 1,
        padding: 5,
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    createPostText : {
        color: '#FFFFFF',
        fontSize: 14
    },
    startPosting : {
        margin: 10
    },
    startPostingText : {
        color: '#777777'
    },
    logOut : {
        backgroundColor: '#d9534f', 
        borderColor: "#d43f3a",
        borderWidth: 1,
        padding: 5,
        margin: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    logOutText : {
        color: '#FFFFFF',
        fontSize: 14
    }
});

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

		
        MemberStream.subscribe((response) => {
            console.warn('Profile > didmount subcribed MemberTeam', JSON.stringify(response.data.posts));
            // TODO Cuando se consulta por el id, y ese id es el owner, los datos vuelven en data.author, PERO cuando se consulta por usuario y ese usuario no es el owner(logeado), los datos vuelven en data.data.author
			let data = {};
			if (response.data) {
				data = response.data; // si hay un nivel de anidamiento, volarlo.
			}
			
			if (data.author) {	
                this.setState({
                    user: data.author,
                    posts: data.posts || [],
                    isLoading: false,
                    selectedTab: 'posts'
                });
            }
        });
		// console.warn('Profile > didmount > gettingMember ...', this.props.id);
        api.getMember(this.props.id, MemberStream);

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
        var subject= require("../services/NavigationManager").getStream();
        subject.onNext({path:'createNewPost'})
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

        var _ownerGrid = (!!this.state.posts.length) ? _grid : null,
            _visitorGrid = (!!this.state.posts.length) ? _grid : null,
            _firstPost = (!this.state.posts.length) ? <View style={styles.startPosting}><Text style={styles.startPostingText}> {I18n.t('startPosting') }</Text></View>: null,

            _ownerTab = (
           <TabNavigator 
                sceneStyle={{ height: postElement.height - 130 }}
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'posts'}
                    renderIcon={() => <View><Icon name="files-o" size={20}/></View>}
                    renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                    onPress={() => this.setState({ selectedTab: 'posts' })}>
                    <ScrollView style={{flex:1}}>
                        {_firstPost}
                        <View>
                            <TouchableHighlight onPress={this.createNewPost} style={styles.createPost} underlayColor={'rgba(0,185,247, 0.7)'}>
                                <Text style={styles.createPostText}> { I18n.t("createPost") } » </Text>
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
						<TouchableHighlight onPress={this.logout} underlayColor={'#d2322d'} style={styles.logOut}>
						      <View><Icon name="sign-out" style={styles.logOutText}><Text>{I18n.t('logout')}</Text></Icon></View>
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
                    sceneStyle={{ height: postElement.height - 130 }}
                >
                    <TabNavigator.Item
                        selected={ this.state.selectedTab === 'posts' }
                        renderIcon={() => <View><Icon name="files-o" size={20} color="#bbbbbb"/></View>}
                        renderSelectedIcon={() => <View><Icon name="files-o" color="#000000" size={20}/></View>}
                        onPress={this.selectedPosts}
                    >
                        <ScrollView style={{flex: 1}}>
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
        //console.warn('Profile > owner ', this.props.owner);
        // if(this.state.isLoading) return (<View style={styles.loading}><GiftedSpinner/></View>);
        
        // var _render = (this.props.owner) ? _ownerTab : _visitorTab;
        var _tab = (this.props.owner) ? _ownerTab : _visitorTab,
            _render = (this.state.isLoading) ? <View style={styles.loading}><GiftedSpinner/></View> : _tab;
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