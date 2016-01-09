/**
 * Sample React Native App
 * https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var SitePanel = require("./app/components/SitePanel");
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
            </Drawer>
        );
    }

    renderScene(route, navigator) {
        var routeId = route.id;
        if (routeId === 'SplashPage') {
            return (
                <SplashPage
                    navigator={navigator} />
            );
        }

        if (routeId === 'PostsList') {
            return (
                <PostsList
                    navigator={navigator} />
            );
        }

        if (routeId === 'LoginPage') {
            return (
                <LoginPage
                    navigator={navigator} />
            );
        }
        if (routeId === 'MainPage') {
            return (
                <Main
                    navigator={navigator} />
            );
        }
        if (routeId === 'PersonPage') {
            return (
                <PersonPage
                    navigator={navigator} />
            );
        }

        if (routeId === 'Search') {
            return (
                <Search
                    navigator={navigator} />
            );
        }

        if (routeId === 'NoNavigatorPage') {
            return (
                <NoNavigatorPage
                    navigator={navigator} />
            );
        }
        return this.noRoute(navigator);

    }

    noRoute(navigator) {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                  onPress={() => navigator.pop()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>No pudimos encontrar la pagina solicitada</Text>
                </TouchableOpacity>
            </View>
        );
    }
};


AppRegistry.registerComponent('sofTokyo', () => sofTokyo);