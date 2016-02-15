/**
 * Created by epotignano on 11/01/16.
 */


var React = require('react-native');

var {
    StyleSheet
} = React;



var Icon = require('react-native-vector-icons/FontAwesome');
var I18nService = require('../../i18n');
I18nService.set('ja-JP',{
    back: '戻る'
});
var I18n = I18nService.getTranslations();
var  {
    TouchableHighlight,
    Text,
    View
} = React;

var styles = StyleSheet.create({
    text : {
        color: '#444444',
        fontSize: 14,
        marginLeft: 5
    }  
})

var BackButton  = React.createClass({

    goBack() {
        //TODO Debe cambiar esto
        var NavigationSubject = require("../../services/NavigationManager").getStream();
        NavigationSubject.onNext( {path: 'back', navigator: this.props.navigator })
    },
    render() {
        return (
            <TouchableHighlight onPress={this.goBack} underlayColor={'transparent'}>
                <View>
                    <Icon name="chevron-left" style={styles.text}> <Text>{I18n.t('back')}</Text></Icon>
                </View>
            </TouchableHighlight>
        )
    }
});

module.exports= BackButton;