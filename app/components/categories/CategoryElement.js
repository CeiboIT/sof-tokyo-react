/**
 * Created by mmasuyama on 1/8/2016.
 */




/**
 * Created by mmasuyama on 1/8/2016.
 */

var React = require("react-native");
var GridView = require("react-native-grid-view");
var {
    ScrollView,
    View,
    StyleSheet,
    TouchableHighlight,
    Text
    } = React;

var styles = StyleSheet.create({
    groupText : {
        color: 'red'
    }
});

var ChildCategory = React.createClass({
   render(){
       return(
            <TouchableHighlight onPress={this.props.onSelect}>
                <Text>{this.props.children['trad']}</Text>
            </TouchableHighlight>
       )
   }
});

ChildCategory.propTypes = {
    onSelect: React.PropTypes.any,
    children: React.PropTypes.object
};

var CategoryElement = React.createClass({
    navigateToCategory(rowData) {
        console.warn(rowData);
        var Navigation = require("../../services/NavigationManager").getStream();
    },
    render() {
        return (
            <View>
                <Text style={styles.groupText}> {this.props.subcategory['trad']}</Text>
                <GridView
                    items={this.props.subcategory['childs']}
                    renderItem={(rowData) =>
                        <ChildCategory key={rowData.id} children={rowData} onSelect={this.navigateToCategory(rowData)} />
                    }
                />
            </View>
        )
    }
});

CategoryElement.propTypes = {
    subcategory : React.PropTypes.object
}

module.exports = CategoryElement;