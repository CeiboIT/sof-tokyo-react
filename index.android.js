/**
 * Sample React Native App
 * https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var SitePanel = require("./app/components/SitePanel");
var FooterNav= require("./app/components/FooterNav");

var routes = require("./app/routes").getRoutes();

var SidebarSubject = require("./app/stores/Streams").getStream("Sidebar");

var Drawer = require('react-native-drawer');
var Router = require('gb-native-router');


var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#111111'
    },
        header: {
            backgroundColor: '#FFF'
        }

});

class sofTokyo extends React.Component{

    constructor(props){
        super(props);


    }

    subscribe() {
        var _closed = true;
        SidebarSubject.subscribe((type) => {
            switch (type){
                case 'open':
                    this.refs.drawer.open();
                    break;
                case 'close':
                    this.refs.drawer.close();
                    break;
            }
        });
    }



    render() {
        this.subscribe();
        return (

            <Drawer
                ref="drawer"
                content={<SitePanel />}
            >
                <Router ref="router" firstRoute={routes.feed} headerStyle={styles.header}>
                </Router>

                <FooterNav></FooterNav>
            </Drawer>

        );
    }
};


AppRegistry.registerComponent('sofTokyo', () => sofTokyo);