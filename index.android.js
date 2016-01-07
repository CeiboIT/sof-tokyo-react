/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/Main');
var Search = require('./app/components/Search');

var {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View,
    TouchableOpacity
    } = React;

var styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#111111'
    },
});

class sofTokyo extends React.Component{
    render() {
        return (
            <Navigator
                initialRoute = {{ id: 'Search', name : 'Index'}}
                renderScene = {this.renderScene.bind(this)}
                style={styles.container}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                      return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                  }}
            />
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
