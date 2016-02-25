var React = require('react-native'),
    Icon = require('react-native-vector-icons/EvilIcons'),
    FaIcon = require('react-native-vector-icons/FontAwesome'),
    storage = require("../../services/Storage").getInstance(),
    user = require("../../utils/api/UserApi");

var I18nService = require('../../i18n');

I18nService.set('ja-JP', {
    'home' : 'ホーム',
    "new": "NEW",
    "news": "お知らせ",
    "myPage": "マイページ",
    "ranking" : "ランキング",
    "login": "ログイン",
    "search": "検索"}
);

var I18n = I18nService.getTranslations();

var {
    Text,
    View,
    ListView,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderColor : "#e5e5e5",
        padding: 5
    },
    buttonContainer : {
        flex:1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems:'center',
        marginRight: 20
    },
    iconContainer : {
        flex:1,
        flexWrap: 'wrap',
        width:20,
        alignItems:'center',
        justifyContent: 'center'
    },
    icon: {
        marginRight: 0
    },

    iconFirst: {

    },

    iconLast : {
        margin: 200
    },
    iconSel : {
        color: 'red'
    },
    iconText : {
        fontSize: 10
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
        marginRight: 10
    },
    item: {
        margin: 10,
        width: 100,
        height: 100
    }
});

class FooterButton extends React.Component {
    render(){
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={this.props.data.action}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.icon}>
                        { this.props.data.itemLabel }
                    </Text>
                    <Text style={styles.iconText}>
                        { this.props.data.itemName }
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

FooterButton.propTypes = {
    data: React.PropTypes.object,
    navigator: React.PropTypes.object
};

var _userLabel;

var _ds;
var _FooterNav = React.createClass({

    getInitialState() {
        _ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            showMenu: true,
            list : _ds.cloneWithRows([])
        }
    },

    renderList(loginStatus) {
        var _logged;
        var _iconName;

        if(loginStatus) {
            _userLabel = I18n.t('myPage');
            _iconName= 'user';
            _logged = true;
        } else {
            _userLabel = I18n.t('login');
            _logged = false;
            _iconName = 'lock'
        }

        this.props = {
            options : [
                {
                    itemLabel: <FaIcon name="home" size={25} style={[styles.icon]}></FaIcon>,
                    itemName: I18n.t('home'),
                    action: () => {
                        this.NavigationSubject.onNext({path: 'feed'})
                    }
                },
                {
                    itemLabel: <FaIcon name="search" size={25} style={[styles.icon]}></FaIcon>,
                    itemName: I18n.t('search'),
                    action: () => {
                        this.NavigationSubject.onNext({path: 'search'})
                    }
                },
                {
                    itemLabel: <FaIcon name="star-o" size={25} style={styles.icon}></FaIcon>,
                    itemName: I18n.t('new'),
                    action: () => {
                        this.NavigationSubject.onNext({path: 'newPosts'})
                    }
                },

                {
                    itemLabel: <FaIcon name="bell-o" size={25} style={styles.icon}></FaIcon>,
                    itemName: I18n.t('news'),
                    action: () => {
                        this.NavigationSubject.onNext({path: 'news'})
                    }
                },
                {
                    itemLabel: <FaIcon name="trophy" size={25} style={styles.icon}></FaIcon>,
                    itemName: I18n.t('ranking'),
                    action: () => {
                        this.NavigationSubject.onNext({path: 'ranking'})
                    }
                },


                {
                    itemLabel : <FaIcon name={_iconName} size={25} style={[styles.icon, styles.iconLast]} />,
                    itemName: _userLabel,
                    action: () => {
                        if(this.state.logged) {
                            storage.load({key: 'UserId'})
                                .then((data) => {
                                    this.NavigationSubject.onNext({path: 'profile', params: {
                                        id: data.data,
                                        owner:true} })
                                });

                        } else {
                            this.NavigationSubject.onNext({path: 'login'})
                        }
                    }
                }
            ]


        };

        this.state.list = this.state.list.cloneWithRows(this.props.options);

        this.setState({
            logged: _logged,
            showMenu:true
        })


    },

    componentDidMount(){
        user.isAuthorized().then((data)=> {
            this.renderList(data.valid)
        }).catch(error => {
            console.warn(error);
            this.renderList(false)
        });

        this.NavigationSubject = require("../../services/NavigationManager").getStream();
        this.NavigationSubject.subscribe((route) => {
            if(route.path ==  'login' || route.path == 'register'){
                this.setState({
                    showMenu: false
                });
            }else {
                this.setState({
                    showMenu:true
                })
            }
        });
    },

    render() {

        var _menu = (this.state.showMenu) ? (
            <ListView contentContainerStyle={styles.list}
                      dataSource={this.state.list}
                      renderRow={ (data) => <FooterButton data={data} navigator={this.props.navigator}/>}
            >
            </ListView>): null;

        return (
            <View style={styles.container}>
                { _menu }
            </View>
        )

    }


});



module.exports = _FooterNav;