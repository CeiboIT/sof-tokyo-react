/**
 * Created by seba on 17/02/16.
 */
import Button from 'apsl-react-native-button'

var I18nService = require('../../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var t = require('tcomb-form-native');
var metadataStream = require('../../services/Streams').getStream('Metadata');
var metadataApi = require('../../utils/api/MetadataApi');
var CircleCheckBox = require('react-native-circle-checkbox');
var GiftedSpinner = require('react-native-gifted-spinner');
//var Switch = require('react-native-material-switch');

I18nService.set('ja-JP', {});


var Form = t.form.Form;


var {
    View,
    Switch,
    Text,
    StyleSheet,
    ListView
    } = React;


var styles = StyleSheet.create({
    Search: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
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

var CreateNewPostStyle = React.createClass({

    getInitialState() {
        return {
            styles: [],
            selectedPostStyles: {},
            checked: false
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
                this.setState({
                    styles: response['data']
                });
            }
        });
    },

    togglePostStyle (postStyle) {
        console.warn('tooglePostStyles ', JSON.stringify(postStyle));
    },

    _renderStyle (postStyle) {
        var toogle = this.togglePostStyle;

        var selectStyle = function () {
            toogle(postStyle);
        };

        return (
            <View>
                <Text>{postStyle.name}</Text>
                <View>
                    <Switch
                        onValueChange={(value) => this.setState({checked: !value})}
                        onTintColor="#00ff00"
                        style={{marginBottom: 10}}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.checked} />
                </View>
            </View>);

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

    generateForm() {
        this.state.styles.map((element) => {
            console.log(element);
        });

        var _formStruct = t.struct({
            rememberMe: t.Boolean
        });

        return (<Form
            ref="form"
            type={_formStruct}
        />)
    },


    render() {

        var _render = (this.state.styles && this.state.styles.length) ?  this.generateForm() : (<View style={styles.loading}><GiftedSpinner/></View>);

        return (
            <View style={{flex:1}}>
                { _render }
            </View>)
    }
});

CreateNewPostStyle.propTypes = {
    newPost: React.PropTypes.any
}

module.exports = CreateNewPostStyle;