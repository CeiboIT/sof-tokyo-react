/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');

var GridView = require('react-native-grid-view');
var metadataStream = require("../services/Streams").getStream("Metadata");


var api = require("../utils/api/MetadataApi");
var postApi = require("../utils/api/PostApi");
var GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableHighlight
    } = React;


var styles = StyleSheet.create({
    styleElement : {
        margin: 10
    }
})


var StyleElement = React.createClass({
    render() {
        return(
            <View style={styles.styleElement}>
                <TouchableHighlight onPress={this.props.onSelect}>
                    <Text >{this.props.style['trad']}</Text>
                </TouchableHighlight>
            </View>
        )
    }
})

StyleElement.propTypes = {
    style: React.PropTypes.object,
    onSelect: React.PropTypes.any
}

var Schools = React.createClass({
    getInitialState() {
        return {
            styles: []
        }
    },

    navigateToStyle(selectedStyle) {
        var Nav = require("../services/NavigationManager").getStream();
        Nav.onNext({ path: 'postsByStyle', params: { styleId : selectedStyle.name }})
    },

    componentDidMount() {
        api.StylesList();
        metadataStream.subscribe((result)=> {
            if(result.type == 'styles') {
                this.setState({
                    styles: result['data']
                })
            }
        })
    },

    render(){
        if(!this.state.styles.length) return (<GiftedSpinner/>)
        return(
            <ScrollView>
                <GridView
                    items={this.state.styles}
                    itemsPerRow={2}
                    renderItem={(rowData) => <StyleElement
                        onSelect={() => this.navigateToStyle(rowData)}
                        key={rowData.id}
                        style={rowData} /> }

                />
            </ScrollView>
        )
    }
});

module.exports = Schools;

