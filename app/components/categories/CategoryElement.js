var React = require("react-native"),
    GridView = require("react-native-grid-view");
    
var {
    ScrollView,
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
    Dimensions
    } = React;

var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    groupText : {
        paddingVertical: 5
    },
    childCategoryContainer : {
        alignItems: 'center',
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    childCategory : {
        
    }
});

var ChildCategory = React.createClass({
   render(){
       return(
            <TouchableHighlight onPress={this.props.onSelect} underlayColor={'transparent'} style={styles.childCategoryContainer}>
                <Text style={styles.childCategory}>{this.props.children['trad']}</Text>
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
        var Navigation = require("../../services/NavigationManager").getStream();
        Navigation.onNext({path:'productsByCategory', params: rowData })
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.groupText}>
                    <Text style={{color: 'red'}}> {this.props.subcategory['trad']}</Text>
                </View>
                <GridView
                    items={this.props.subcategory['childs']}
                    itemsPerRow={1}
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