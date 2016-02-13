/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var SitePanel = require("./app/components/navigation/SitePanel");
var FooterNav= require("./app/components/navigation/FooterNav");

var SidebarSubject = require("./app/services/Streams").getStream("Sidebar");
var firstRoute = require("./app/services/NavigationManager").getFirstRoute();

var Drawer = require('react-native-drawer');
var Router = require('gb-native-router');

var {
    AppRegistry,
    StyleSheet
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
        <Drawer ref="drawer" content={<SitePanel/>} side="right" acceptPan={ false }>
          <Router ref="router" firstRoute={firstRoute} headerStyle={styles.header}>
          </Router>
          <FooterNav/>
        </Drawer>
    );
  }
}
AppRegistry.registerComponent('sofTokyo', () => sofTokyo);