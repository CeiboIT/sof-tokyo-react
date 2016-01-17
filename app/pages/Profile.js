/**
 * Created by epotignano on 12/01/16.
 */



var React = require('react-native');
var UserStream = require("../services/Streams").getStream("User");

import TabNavigator from 'react-native-tab-navigator';

var Badge = require('../components/user/Badge');

var api = require('../utils/api/UserApi');
var storage = require('../services/Storage').getInstance();
var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
    View,
    Text,
    StyleSheet,
    ScrollView
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
});

var Profile = React.createClass({

    getInitialState() {
        return {
            user: {},
            isLoading: true
        }
    },

    componentWillMount() {
        this.getUserData(this.props.id);
        UserStream.subscribe((data) => {
            this.setState({
                user: data.data,
                isLoading:false,
                selectedTab: 'home'
            })
        })
    },

    getUserData(id) {
        if(id = 'me'){
            storage.load({key: 'UserId'})
            .then((ret) => {
                api.getUser(ret.data)
            })
        } else {
            api.getUser(id)
        }
    },

    render() {

        var _ownerTab = (<TabNavigator>
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
        </TabNavigator>);
        return(
            <View>
                <Badge data={this.state.user} />
                {_ownerTab}
            </View>
        );
    }
});





Profile.propTypes = {
  id : React.PropTypes.any
};

module.exports = Profile;