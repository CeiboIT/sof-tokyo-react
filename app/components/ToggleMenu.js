/**
 * Created by mmasuyama on 1/8/2016.
 */

var React = require("react-native");
var Icon = require('react-native-vector-icons/FontAwesome');
var SidebarSubject = require("../stores/Sidebar");

console.log(SidebarSubject);

var {
    StyleSheet,
    TouchableHighlight,
    Text,
    View
    } = React;

var styles = StyleSheet.create({
    icon: {
        width: 25,
            height:18,
            marginTop: 5,
            marginLeft:8
    }});

var ToggleMenuIcon = React.createClass({
    tap() {
        SidebarSubject.onNext('open')
    },
    render() {
        return (
            <TouchableHighlight onPress={this.tap}>
                <Text> PAG </Text>
            </TouchableHighlight>
        )
    }
});

module.exports = ToggleMenuIcon;