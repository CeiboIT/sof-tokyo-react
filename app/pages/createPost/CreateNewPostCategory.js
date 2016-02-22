/**
 * Created by seba on 17/02/16.
 */
import Button from 'apsl-react-native-button'

var I18nService = require('../../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var metadataStream = require('../../services/Streams').getStream('Metadata');
var categoryApi = require('../../utils/api/MetadataApi');
var Accordion = require('react-native-accordion');

I18nService.set('ja-JP', {});

var {
    View,
    StyleSheet,
    ListView,
    Text,
    } = React;

var CreateNewPostCategory = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            categories: [],
            dataSource: ds
        }
    },

    getValues() {
        console.warn('CreateNewPostCategory selectCategory props.newPost', JSON.stringify(this.props));
        return this.props;
    },

    componentDidMount() {
        categoryApi.Categories();
        metadataStream.subscribe((response)=> {
            if (response.type === 'subcategories') {
                var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                ds = ds.cloneWithRows(response['data']);
                //console.warn('componentIdMount > newPost', JSON.stringify(this));
                this.setState({
                    newPost: this.props.newPost,
                    ds: ds,
                    categories: response['data']
                });
            }
        });
    },

    selectCategory(category) {
        var Nav = require("../../services/NavigationManager").getStream();
        this.props.newPost.category = category;
        Nav.onNext({path: 'createNewPostStyle', params: {newPost: this.props.newPost} });
    },

    _renderAccordionItem(category) {
        var selectCategory = this.selectCategory;

        var selectCat = function () {
            console.warn('CreateNewPostCategory > selectCat ', JSON.stringify(category));
            selectCategory(category);
        };

        var renderHeader =
            (
                <View style={styles.accordionParent}>
                    <Text>Parent: {category.trad}</Text>
                </View>
            );

        var renderContent = [];
        category.childs
            .forEach(function (child) {
                return renderContent.push(
                    <View style={{ backgroundColor: '#f9f9f9' }}>
                        <Text style={styles.accordionChild}
                                onPress={selectCat}>
                            {child.name}
                        </Text>
                    </View>);
            });

        return (<Accordion
                header={renderHeader}
                content={renderContent}
                easing="easeOutCubic">
            </Accordion>);
    },
    _renderList() {
        if (this.state.ds) {
            return (<ListView
                dataSource={this.state.ds}
                renderRow={this._renderAccordionItem}
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

CreateNewPostCategory.propTypes = {
    newPost: React.PropTypes.any
};

module.exports = CreateNewPostCategory;