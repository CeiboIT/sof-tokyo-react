/**
 * Created by epotignano on 10/01/16.
 */

var React = require("react-native");

var {
    StyleSheet,
    ToastAndroid,
} = React;

var ErrorSubject = require("./Streams").getStream("Errors");

class Errors extends React.Component {
    constructor(props) {
        super(props);

        ErrorSubject.subscribe((error) =>{
            ToastAndroid.show(error.type, ToastAndroid.LONG)
        })
    }
    render() {
        return(
            <View>

            </View>
        )
    }
}