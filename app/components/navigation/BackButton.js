/**
 * Created by epotignano on 11/01/16.
 */


var React = require('react-native');
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
class BackButton extends React.Component {
    constructor(props) {
        super(props);
        this.NavigationSubject= require("../../services/NavigationManager")
    }
    goBack() {
        this.NavigationSubject.onNext('back', this.props.navigator)
    }
    render() {
        return (
            <TouchableHighlight>
                <View>
                    <Icon name="arrow-left"><Text>{I18n.t('back')}</Text></Icon>
                </View>
            </TouchableHighlight>
        )
    }
}

module.exports= BackButton;