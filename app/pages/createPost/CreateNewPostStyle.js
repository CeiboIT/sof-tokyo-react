var React = require('react-native'),
    I18nService = require('../../i18n'),
    I18n = I18nService.getTranslations(),
    t = require('tcomb-form-native'),
    metadataStream = require('../../services/Streams').getStream('Metadata'),
    metadataApi = require('../../utils/api/MetadataApi'),
    GiftedSpinner = require('react-native-gifted-spinner'),
    {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');

var api = require("../../utils/api/PostApi");
var NewPostStream = require('../../services/Streams').getStream('NewPost');

import Button from 'apsl-react-native-button';
import GridView  from 'react-native-grid-view';

I18nService.set('ja-JP', {});

var Form = t.form.Form;

var {
    View,
    Switch,
    Text,
    StyleSheet,
    ListView,
    ScrollView
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
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        color: '#7c7c7c'
    }
});


var CreateNewPostStyle = React.createClass({

    getInitialState() {
        this.props.newPost.styles = []
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
                // console.warn('CreateNewPostStyle > componentDidMount ', JSON.stringify(response['data']));
                this.setState({
                    newPost: this.props.newPost,
                    styles: response['data']
                });
            }
        });
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
    selectStyle(style) {
        if(style.name === 'simple') style.name = 'basic';
        
        if(this.state.newPost.styles.indexOf(style.name) == -1){
            this.state.newPost.styles.push(style.name)
        }
    },
    goToPreview(){
        var newPost = this.state.newPost;
        api.createNewPost(newPost);
        // var Nav = require("../../services/NavigationManager").getStream();
        // Nav.onNext({path: 'createNewPostPreview', params: {newPost: {newPost}} });
    },
    render() {
        return (
            
            <GiftedForm formName='stylesForm'>
                    <GiftedForm.SelectWidget name='styles' title='Styles' multiple={true}>
                        {
                            this.state.styles.map((style) => ( 
                                <GiftedForm.OptionWidget key={style.trad} title={style.trad} value={style.trad} style={{paddingLeft:25}} onPress={() => this.selectStyle(style)}/>
                            ))
                        }
                    </GiftedForm.SelectWidget>
                    
                    <GiftedForm.SubmitWidget
                    title="Post"
                    widgetStyles={{
                        submitButton: {
                        backgroundColor: '#34767F',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        this.goToPreview()
                        if (isValid === true) {
                            postSubmit();
                        }
                    }}
                />
                    
                    </GiftedForm>
         
                )
    }
});

CreateNewPostStyle.propTypes = {
    newPost: React.PropTypes.any
}

CreateNewPostStyle.contextTypes = {
    navigator: React.PropTypes.any
}

module.exports = CreateNewPostStyle;