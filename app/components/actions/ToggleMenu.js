/**
 * Created by mmasuyama on 1/8/2016.
 */

var React = require("react-native");
var Icon = require('react-native-vector-icons/FontAwesome');
var SidebarSubject = require("../../services/Streams").getStream("Sidebar");

var {
    StyleSheet,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    icon: {
        width: 25,
        marginTop:5,
        marginRight:8
    }});

var ToggleMenuIcon = React.createClass({
    tap() {
        SidebarSubject.onNext('open')
    },
    render() {
        return (
            <TouchableHighlight onPress={this.tap} underlayColor="transparent">
                <Icon name="user" color="#000" style={styles.icon} size={30}></Icon>
            </TouchableHighlight>
        )
    }
});

module.exports = ToggleMenuIcon;