/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');

var {
    Text,
    View,
    ListView,
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
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
                <Text>
                    { this.props.data.itemLabel }
                </Text>
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
        console.log(props);
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.props = {
            options : [
                {
                    itemLabel: 'User',
                    iconName: 'users',
                    action: () => {
                       this.props.navigator.push({
                           id: 'User'
                       })
                    }
                }
            ]
        };
        this.list = this.ds.cloneWithRows(this.props.options);
    }

    render(){
        return (
            <View style={styles.container}>
                <ListView contentContainerStyle={styles.list}
                          dataSource={this.list}
                          renderRow={ (data) => <FooterButton data={data} navigator={this.props.navigator}/>}
                >
                </ListView>
            </View>
        )
    }
}



module.exports = FooterNav;