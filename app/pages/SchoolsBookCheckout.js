/**
 * Created by epotignano on 25/01/16.
 */
/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var GridView = require('react-native-grid-view');
var communication = require("../utils/api/CommunicationApi");

var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
    } = React;

var SchoolElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight>
                    <Text >{this.props.school.value}</Text>
                </TouchableHighlight>
            </View>
        )
    }
})

SchoolElement.propTypes = {
    school: React.PropTypes.object,
    onSelect: React.PropTypes.any
}

var SchoolsCheckout = React.createClass({

    sendMail() {
        var  _params= {
            fromEmail : params.userEmail,
            fromName : params.userName,
            subject : "Subject",
            content: ""
        }
        this.state.selectedSchools.map((element) => {
            _params.content += element.value;
        })
        communication.sendMail(_params)
    },

    render(){
        console.warn(Object.keys(this.props));
        return(
            <View>
                <GridView
                    items={this.props.schools}
                    itemsPerRow={1}
                    renderItem={(school) => <SchoolElement key={school.value} school={school} />}
                />
                <TouchableHighlight onPress={this.sendMail}>
                    <Text>
                        Finish
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
});

SchoolsCheckout.propTypes = {
    schools: React.PropTypes.any
}

module.exports = SchoolsCheckout;

