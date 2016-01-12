/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

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
        backgroundColor: '#FFF'
    },

    buttonContentContainer : {
        flex:1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    icon: {
        alignItems:'center',
        flex:1
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
        marginLeft: 10
    }
});


class FooterButton extends React.Component {

    render(){
        return (
            <TouchableHighlight style={styles.buttonContainer} onPress={this.props.data.action}>
                <View style={styles.buttonContentContainer}>
                    <Text>
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
            if(route.path ==  'login'){
                this.setState({
                    showMenu: false
                });
            }
        });

        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.props = {
            options : [
                {
                    itemLabel: I18n.t('home'),
                    iconName: 'users',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'feed'})
                    }
                },
                {
                    itemLabel: I18n.t('search'),
                    iconName: 'users',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'search'})
                    }
                },
                {
                    itemLabel: I18n.t('new'),
                    iconName: 'users',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'schools'})
                    }
                },

                {
                    itemLabel: I18n.t('news'),
                    iconName: 'users',
                    action: () => {
                        this.NavigationSubject.onNext({path: 'news'})
                    }
                },{
                    itemLabel : I18n.t('myPage'),
                    action: () => {
                        this.NavigationSubject.onNext({'path': 'profile'})
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