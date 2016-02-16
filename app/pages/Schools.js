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
    titleContainer : {
        padding: 5,
        borderWidth: 1,
        borderColor: "#8a52ad",
        margin : 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title : {
        
    },
    items : {
        padding : 5
    },
    school : {
        borderColor: "transparent",
        borderWidth: 1,
        padding: 5,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    selectedSchool : {
        borderColor: "#8a52ad",
        backgroundColor: "#8a52ad",
        borderWidth: 1,
        padding: 5,
        margin: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    loadMoreText : {
        color: "#8a52ad"
    },
    selectedLoadMoreText : {
        color: "white"
    }
});

var SchoolElement = React.createClass({

    getInitialState() {
        return {
            selected: false
        }
    },

    elementSelected() {

        var _selected = !this.state.selected;

        this.setState({
            selected : _selected
        });
        this.props.onSelect();
    },

    render() {

        var _style = (this.state.selected) ? styles.selectedSchool : styles.school,
            _styleText = (this.state.selected) ? styles.selectedLoadMoreText : styles.loadMoreText;

        return(
            <View>
                <TouchableHighlight underlayColor={'transparent'} onPress={this.elementSelected }
                    style={ _style }>
                    <Text style={ _styleText }>{this.props.school.value}</Text>
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
        if(school) {
            var _index = this.state.selectedSchools.indexOf(school);
            if(_index === -1) {
                this.state.selectedSchools.push(school);
            } else {
                this.state.selectedSchools.splice(_index, 1);
            }
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
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={this.navigateToCheckout} style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Request Books »
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

