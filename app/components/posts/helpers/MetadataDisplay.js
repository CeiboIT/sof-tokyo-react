var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var MetadataDisplay = React.createClass({

    getInitialState() {
        return {
            
        }
    },

    componentDidMount() {
        
    },
    
    goToMetadata() {
        var subject= require("../../../services/NavigationManager").getStream();
        if(this.props.metadata.type == 'style'){
           subject.onNext({path:'postsByStyle', params: {styleId: this.props.metadata.id} }) 
        }
        if(this.props.metadata.type == 'category'){
            
        }
    },
    
    render() {

        var _categories = this.props.categories;

        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={ this.goToMetadata }>
                <View>
                   <Text>{this.props.metadata.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
})

MetadataDisplay.stateProps = {
    metadata : React.PropTypes.object
}

module.exports = MetadataDisplay;