var React = require('react-native'),
    GridView = require('react-native-grid-view'),
    metadataStream = require("../services/Streams").getStream("Metadata"),
    api = require("../utils/api/MetadataApi"),
    postApi = require("../utils/api/PostApi"),
    GiftedSpinner = require('react-native-gifted-spinner');

var {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableHighlight
    } = React;


var styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    styleElement : {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
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


var StyleElement = React.createClass({
    render() {
        return(
            <View>
                <TouchableHighlight onPress={this.props.onSelect} underlayColor={'transparent'} style={styles.styleElement}>
                    <Text>{this.props.style['trad']}</Text>
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
        if(!this.state.styles.length) return (<View style={styles.loading}><GiftedSpinner/></View>)
        return(
            <ScrollView style={{backgroundColor: '#F7F7F7', padding: 10}}>
                <View style={styles.container}>
                    <GridView
                        items={this.state.styles}
                        itemsPerRow={2}
                        renderItem={(rowData) => <StyleElement
                            onSelect={() => this.navigateToStyle(rowData)}
                            key={rowData.id}
                            style={rowData} /> }

                    />
                </View>
            </ScrollView>
        )
    }
});

module.exports = Schools;

