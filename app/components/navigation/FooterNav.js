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
    iconLast : {
        margin: 0
    },
    iconSel : {
        color: 'red'
    },
    iconText : {
        fontSize: 12
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
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

class FooterNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: true
        };

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

        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.props = {
            options : [
                {
                    itemLabel: <FaIcon name="home" size={25} style={[styles.icon]}></FaIcon>,
                    itemName: 'home',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'feed'})
                    }
                },
                {
                    itemLabel: <FaIcon name="search" size={25} style={[styles.icon]}></FaIcon>,
                    itemName: 'search',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'search'})
                    }
                },
                {
                    itemLabel: <FaIcon name="star-o" size={25} style={styles.icon}></FaIcon>,
                    itemName: 'new',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'newPosts'})
                    }
                },

                {
                    itemLabel: <FaIcon name="bell-o" size={25} style={styles.icon}></FaIcon>,
                    itemName: 'news',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'news'})
                    }
                },
                {
                    itemLabel: <FaIcon name="trophy" size={25} style={styles.icon}></FaIcon>,
                    itemName: 'ranking',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'ranking'})
                    }
                },


                {
                    itemLabel : <FaIcon name="user" size={25} style={[styles.icon, styles.iconLast]}></FaIcon>,
                    itemName: 'profile',
                    action: () => {
                        user.isAuthorized()
                            .then((data) => {
                                if(!data.valid) {
                                    this.NavigationSubject.onNext({path: 'login'})
                                }else {
                                    storage.load({key: 'UserId'})
                                        .then((data) => {
                                            this.NavigationSubject.onNext({path: 'profile', params: {
                                                id: data.data,
                                                owner:true} })
                                        })
                                }
                            }).catch((error) => {
                            this.NavigationSubject.onNext({path: 'login'})
                        })

                    }

                }
            ]
        };
        this.list = this.ds.cloneWithRows(this.props.options);
    }

    render(){

        var _menu = (this.state.showMenu) ? (
            <ListView contentContainerStyle={styles.list}
                      dataSource={this.list}
                      renderRow={ (data) => <FooterButton data={data} navigator={this.props.navigator}/>}
            >
            </ListView>): null;
        
        return (
            <View style={styles.container}>
                { _menu }
            </View>
        )
    }
}


module.exports = FooterNav;