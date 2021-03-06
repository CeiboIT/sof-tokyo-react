var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;
    
var styles = StyleSheet.create({
    items : {
        marginRight: 2,
        marginBottom: 2,
        borderWidth: 1,
        borderColor: "#e5e5e5",
        borderRadius: 4,
        paddingVertical: 1,
        paddingHorizontal: 8
    },
    itemsText : {
        fontSize : 11,
        color: "#b3b3b3"
    }
});

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
            subject.onNext({path:'postsByCategory', params: {categoryId: this.props.metadata.id} })
        }
    },
    
    render() {

        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={ this.goToMetadata } style={styles.items}>
                <View>
                   <Text style={styles.itemsText}>{this.props.metadata.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
})

MetadataDisplay.stateProps = {
    metadata : React.PropTypes.object
}

module.exports = MetadataDisplay;