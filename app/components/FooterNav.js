/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var NavigationSubject= require("../stores/Streams").getStream("Navigation");
var Icon = require('react-native-vector-icons/FontAwesome');



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
    }
});


class FooterButton extends React.Component {
    render(){
        console.log(this.props);
        return (
            <TouchableHighlight onPress={this.props.data.action}>
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

        NavigationSubject.subscribe((route) => {
            if(route == 'login'){
                this.setState({
                    showMenu: false
                });
            }
        });

        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.props = {
            options : [
                {
                    itemLabel: 'Categories',
                    iconName: 'users',
                    action: () => {
                        NavigationSubject.onNext('categories')
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