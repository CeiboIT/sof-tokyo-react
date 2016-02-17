/**
 * Created by seba on 17/02/16.
 */
import Form from 'react-native-form'

var I18n = I18nService.getTranslations();
var React = require('react-native');

I18nService.set('ja-JP', {
    'title': '作品のタイトル',
    'description': '作品の説明'
});

var NewPost = React.createClass({

    render() {
        (<View>
            <Form ref="form">
                <TextInput name="title" placeholder={I18n.t('title')}/>
                <TextInput name="email" placeholder={I18n.t('description')}/>
            </Form>
        </View>)
    }
});

module.exports = NewPost;
