/**
 * Created by mmasuyama on 1/8/2016.
 */

var React = require("react-native");
var GridView = require("react-native-grid-view");
var MetadataApi = require("../../utils/api/MetadataApi");
var MetadataStream = require("../../services/Streams").getStream("Metadata");
var CategoryElement = require("./CategoryElement");
var GiftedSpinner = require("react-native-gifted-spinner");

var {
        ScrollView,
        View,
        StyleSheet
    } = React;

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
            <ScrollView>
                <GridView
                    items={ this.state.subcategories }
                    itemsPerRow={ 1 }
                    renderItem={(rowData) => <CategoryElement key={rowData.id} subcategory={ rowData } />}
                    style={{
                        backgroundColor: '#F7F7F7'
                    }}
                />
            </ScrollView>
        )

        var _loading = (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7F7F7'
              }}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.subcategories && this.state.subcategories.length) ? _grid : _loading
        return _render


    }
});

module.exports = CategoriesList;