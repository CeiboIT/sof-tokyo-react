/**
 * Created by seba on 17/02/16.
 */
import Button from 'apsl-react-native-button'

var I18nService = require('../../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var metadataStream = require('../../services/Streams').getStream('Metadata');
var metadataApi = require('../../utils/api/MetadataApi');
var CheckBox = require('react-native-checkbox');
I18nService.set('ja-JP', {});

var {
    View,
    StyleSheet,
    ListView
    } = React;


var CreateNewPostStyle = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds,
            selectedPostStyles: {}
        }
    },

    selectStyle(postStyles) {
        var Nav = require("../../services/NavigationManager").getStream();
        Nav.onNext({path: 'createNewPostCategory', params: {newPost: this.getValues()} });
    },

    componentDidMount() {
        metadataApi.StylesList();
        metadataStream.subscribe((response)=> {
            if (response.type === 'styles') {
                console.warn('CreateNewPostStyle > componentDidMount ', JSON.stringify(response['data']));
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                ds = ds.cloneWithRows(response['data']);
                this.setState({
                    ds: ds,
                    selectedPostStyles: {}
                });
            }
        });
    },

    togglePostStyle (postStyle) {
        console.warn('tooglePostStyles ', JSON.stringify(this.state.selectedStyles));
        //if (this.state.selectedStyles[postStyle.id]) {
            //delete this.state.selectedStyles[postStyle.id];
        //} else {
            //this.state.selectedStyles[postStyle.id] = postStyle;
        //}
    },

    _renderStyle (postStyle) {
        var toogle = this.togglePostStyle;

        var selectStyle = function () {
            toogle(postStyle);
        };

        return (
        <CheckBox
            style={{paddingTop: 10}}
            label={postStyle.name}
            checked={false}
            onChange={(checked) => selectStyle()}
        />);
            //<Switch
            //    onValueChange={(value) => this.tooglePostStyle(value)}
            //    style={{marginBottom: 10}}
            //    value={postStyle} />
    },

    _renderList() {
        if (this.state.ds) {
            return (<ListView
                dataSource={this.state.ds}
                renderRow={this._renderStyle}
            />);
        } else {
            console.warn('renderList > return empty');
        }
    },

    render() {
        return (
            <View style={{flex:1}}>
                {this._renderList()}
            </View>)
    }
});

var styles = StyleSheet.create({
    Search: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    base: {
        width: 90,
        height: 90
    },
    accordionParent: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#7c7c7c'
    },
    accordionChild: {
        fontSize: 15,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        color: '#7c7c7c'
    }
});

CreateNewPostStyle.propTypes = {
    newPost: React.PropTypes.any
}

module.exports = CreateNewPostStyle;