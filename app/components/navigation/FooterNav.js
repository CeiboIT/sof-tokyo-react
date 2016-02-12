/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/EvilIcons');
var FaIcon = require('react-native-vector-icons/FontAwesome');
var storage = require("../../services/Storage").getInstance();
var user = require("../../utils/api/UserApi");

var I18nService = require('../../i18n');

I18nService.set('ja-JP', {
    'home' : 'ホーム',
    "new": "NEW",
    "news": "お知らせ",
    "myPage": "マイページ",
    search: "検索"}
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

    buttonContentContainer : {
        flex:1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    icon: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
        color: '#b897cd',
        marginRight: 20
    },
    iconLast : {
        margin: 0
    },
    iconSel : {
        color: 'red'
    },
    activeIcon : {
        color: '#0000FF'
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
    },
    buttonContentContainer : {
        alignItems:'center',
        justifyContent: 'center'
    }
});


class FooterButton extends React.Component {

    render(){
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={this.props.data.action}>
                <View style={styles.buttonContentContainer}>
                    <Text style={styles.icon}>
                        { this.props.data.itemLabel }
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
                    itemLabel: <FaIcon name="home" size={33} style={[styles.icon]}></FaIcon>,
                    action: () => {
                        this.NavigationSubject.onNext({path: 'feed'})
                    }
                },
                {
                    itemLabel: <FaIcon name="search" size={30} style={[styles.icon]}></FaIcon>,
                    action: () => {
                        this.NavigationSubject.onNext({path: 'search'})
                    }
                },
                {
                    itemLabel: <FaIcon name="star-o" size={30} style={styles.icon}></FaIcon>,
                    action: () => {
                        this.NavigationSubject.onNext({path: 'newPosts'})
                    }
                },

                {
                    itemLabel: <FaIcon name="bell-o" size={30} style={styles.icon}></FaIcon>,
                    action: () => {
                        this.NavigationSubject.onNext({path: 'news'})
                    }
                },
                {
                    itemLabel: <FaIcon name="trophy" size={30} style={styles.icon}></FaIcon>,
                    action: () => {
                        this.NavigationSubject.onNext({path: 'ranking'})
                    }
                },


                {
                    itemLabel : <FaIcon name="user" size={30} style={[styles.icon, styles.iconLast]}></FaIcon>,
                    action: () => {
                        user.isAuthorized()
                            .then((data) => {
                                if(!data.valid) {
                                    this.NavigationSubject.onNext({'path': 'login'})
                                }else {
                                    storage.load({key: 'UserId'})
                                        .then((data) => {
                                            this.NavigationSubject.onNext({'path': 'profile', params: {
                                                id: data.data,
                                                owner:true} })
                                        })
                                }
                            }).catch((error) => {
                            console.warn(JSON.stringify(error));
                            this.NavigationSubject.onNext({'path': 'login'})
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