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
    ScrollView,
    Text,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#F7F7F7'
    },
    container : {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    title : {
        fontWeight : 'bold',
        margin : 10
    },
    items : {
        padding : 5
    }
});

var SchoolElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.props.onSelect}>
                    <Text style={styles.items}>{this.props.school.value}</Text>
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
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={this.navigateToCheckout}>
                        <Text style={styles.title}>
                            Request Books
                        </Text>
                    </TouchableHighlight>

                    <GridView
                        style={styles.test}
                        items={this.state.schools}
                        itemsPerRow={1}
                        renderItem={(rowData) => <SchoolElement
                            onSelect={() => this.selectSchool(rowData)}
                            key={rowData.value}
                            school={rowData} /> }
                    />
                </View>
            </ScrollView>
        )
    }
});

module.exports = Schools;

