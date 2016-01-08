/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native')

var {
    SwitchIOS,
    View,
    Text
    } = React

var Icon = require('react-native-vector-icons/FontAwesome');

module.exports = React.createClass({
    render(){
        return (
            <View>
                <Text>
                    Control Panel
                    <Icon name="rocket" size={30} color="#900" />
                </Text>
            </View>
        )
    }
})