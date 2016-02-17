var React = require("react-native"),
    GridView = require("react-native-grid-view"),
    MetadataApi = require("../../utils/api/MetadataApi"),
    MetadataStream = require("../../services/Streams").getStream("Metadata"),
    CategoryElement = require("./CategoryElement"),
    GiftedSpinner = require("react-native-gifted-spinner");

var {
     ScrollView,
     View,
     StyleSheet
    } = React;
    
var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    loading : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
    }
})
    
    

var CategoriesList = React.createClass({

    componentDidMount() {
        MetadataApi.Categories();
        MetadataStream.subscribe((data) => {
            if(data.type == 'subcategories') {
                this.setState({
                    subcategories : data.data
                });
            }
        });
    },

    getInitialState() {
        return {
            subcategories : []
        }
    },

    render() {
        var _grid = (
            <ScrollView style={{backgroundColor: '#F7F7F7', padding: 10}}>
                <View style={styles.container}>
                    <GridView
                        items={ this.state.subcategories }
                        itemsPerRow={ 1 }
                        renderItem={(rowData) => <CategoryElement key={rowData.id} subcategory={ rowData } />}
                    />
                </View>
            </ScrollView>
        )

        var _loading = (
            <View style={styles.loading}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.subcategories && this.state.subcategories.length) ? _grid : _loading
        return _render


    }
});

module.exports = CategoriesList;