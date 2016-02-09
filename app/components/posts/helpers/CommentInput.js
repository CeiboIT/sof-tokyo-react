/**
 * Created by epotignano on 22/01/16.
 */

var t = require('tcomb-form-native');
var I18nService = require('../../../i18n');
var I18n = I18nService.getTranslations();
var React= require("react-native");
import Button from 'apsl-react-native-button'
var api = require("../../../utils/api/PostApi")

I18nService.set('ja-JP', {
        'commentSubmit' : 'コメントを投稿'
    }
);
var {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
    } = React;

var Icon = require('react-native-vector-icons/EvilIcons');

var Form = t.form.Form;

// here we are: define your domain model
var Comment = t.struct({
    comment: t.String
});


var styles = StyleSheet.create({
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})


var CommentInput = React.createClass({

    onPress() {
        var _formVal = this.refs.form.getValue();
        api.sendComment(_formVal.comment, this.props.id, this.props.subject)
    },

    render() {
        return(
        <View>
            <Form ref="form" type={Comment}></Form>
            <Button style={styles.button}
                    onPress={this.onPress} children="コメントを投稿">
            </Button>
        </View>
        )
    }

})


module.exports = CommentInput;