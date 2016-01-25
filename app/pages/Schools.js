/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');

var GridView = require('react-native-grid-view');
var SchoolsStream = require("../services/Streams").getStream("Schools");

var api = require("../utils/api/SchoolsApi");

var GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
    } = React;



var SchoolElement = React.createClass({
    navigateToSchoolProfile() {
        var NavigationManager= require("../services/NavigationManager").getStream();
        NavigationManager.onNext({path: 'schoolProfile', params: {school: this.props.school} })
    },

    render() {
        return(
            <View>
                <TouchableHighlight onPress={this.navigateToSchoolProfile}>
                    <Text >{this.props.school.value}</Text>
                </TouchableHighlight>
            </View>
        )
    }
})

SchoolElement.propTypes = {
    school: React.PropTypes.object
}


var Schools = React.createClass({
    getInitialState() {
        return {
            schools: []
        }
    },

    componentDidMount() {
        api.LoadSchools();
        SchoolsStream.subscribe((data)=> {
            this.setState({
                schools: data['schools']
            })
        })
    },

    render(){
        if(!this.state.schools.length) return (<GiftedSpinner/>)
        return(
            <GridView
                items={this.state.schools}
                itemsPerRow={1}
                renderItem={(rowData) => <SchoolElement school={rowData} />}
            />
        )
    }
});

module.exports = Schools;

