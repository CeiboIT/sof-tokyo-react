/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');

var GridView = require('react-native-grid-view');
var SchoolsStream = require("../services/Streams").getStream("Schools");


var api = require("../utils/api/SchoolsApi");
var communication = require("../utils/api/CommunicationApi");
var GiftedSpinner = require('react-native-gifted-spinner');

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
                <TouchableHighlight onPress={this.props.onSelect}>
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

var Schools = React.createClass({
    getInitialState() {
        return {
            schools: [],
            selectedSchools:[]
        }
    },

    navigateToCheckout() {
        var Nav = require("../services/NavigationManager").getStream();
        Nav.onNext({path: 'schoolsCheckout', params: {schools: this.state.selectedSchools} })
    },

    selectSchool(school) {
        this.state.selectedSchools.push(school);
        this.state.selectedSchools.map((data) => {
            console.warn(data.value);
        })
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
            <View>
                <TouchableHighlight onPress={this.navigateToCheckout}>
                    <Text>
                        Request Book
                    </Text>
                </TouchableHighlight>

                <GridView
                    items={this.state.schools}
                    itemsPerRow={1}
                    renderItem={(rowData) => <SchoolElement
                        onSelect={() => this.selectSchool(rowData)}
                        key={rowData.value}
                        school={rowData} /> }

                />
            </View>
        )
    }
});

module.exports = Schools;

