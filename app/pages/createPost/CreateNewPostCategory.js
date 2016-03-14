/**
 * Created by seba on 17/02/16.
 */
import Button from 'apsl-react-native-button'

var I18nService = require('../../i18n');
var I18n = I18nService.getTranslations();
var React = require('react-native');
var metadataStream = require('../../services/Streams').getStream('Metadata');
var categoryApi = require('../../utils/api/MetadataApi');
var Accordion = require('react-native-collapsible/Accordion');
var Collapsible = require('react-native-collapsible');
import CeiboSelectable from '../../components/forms/select/CeiboSelectable';

I18nService.set('ja-JP', {});

var {
    View,
    StyleSheet,
    ListView,
    ScrollView,
    Text
    } = React;


var Header = React.createClass({
    render() {
        return(
            <View style={styles.accordionParent} key={this.props.category.id}>
                <Text>{category.trad}</Text>
            </View>
        )
    }
});

Header.propTypes = {
    category: React.PropTypes.object
};

var CategoryElement = React.createClass({

    selectCategory(category) {
        var Nav = require("../../services/NavigationManager").getStream();
        //this.props.newPost.category = category;
        Nav.onNext({path: 'createNewPostStyle', params: {newPost: {}} });
    },

    render() {
        const { child } = this.props;

        return(
            <Button onPress={() => {
                this.selectCategory(child);
            }}>
                { child.trad }
            </Button>
        )
    }
});

CategoryElement.propTypes = {
    child: React.PropTypes.object
};

var selectCategory = function(category) {

};

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



    _renderAccordionItem(category, i) {

        var _SECTIONS = [{
            title: category.trad,
            childs: category.childs
        }];

        var _renderHeader = function(section) {
            return (
                <View style={styles.accordionParent}>
                    <Text>{section.title}</Text>
                </View>
            );
        };

        var _renderContent = function (section) {
            return (
                <View style={styles.content}>
                    <CeiboSelectable list={ section['childs'] } iconName='check' iconColor='green' iconSize={15} valueKey="id" labelKey="trad"  />
                </View>
            );
        };

        var selectCat = function () {
            console.warn('CreateNewPostCategory > selectCat ', JSON.stringify(category));
            selectCategory(category);
        };

        return (
            <View key={i}>
                <Accordion
                    sections={_SECTIONS}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                />
            </View>);
    },
    _renderView() {
        if (this.state.ds) {
            return (
                this.state.categories.map((element, i) => {
                    return this._renderAccordionItem(element, i);
                })
            );
        } else {
            console.warn('renderList > return empty');
        }
    },

    render() {
        const { params } = this.props;

        return (
            <ScrollView style={{flex:1}}>
                {this._renderView()}
            </ScrollView>)
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
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#f7f7f7'
    },
    accordionChild: {
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