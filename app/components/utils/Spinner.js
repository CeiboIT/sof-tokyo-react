/**
 * Created by epotignano on 13/01/16.
 */

var React = require('react-native');
var {
    View,
    } = React;

var GiftedSpinner = require('react-native-gifted-spinner');

var Example = React.createClass({
    render() {
        return (
            <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
                <GiftedSpinner />
            </View>
        );
    }
});
