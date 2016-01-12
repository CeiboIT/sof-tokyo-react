/**
 * Created by epotignano on 11/01/16.
 */

var I18n = require('react-native-i18n');
I18n.locale = 'ja-JP';


class I18nService {
    constructor(){
        this.I18n = I18n;
        // intialization
        this.I18n.translations = I18n.translations;

        //Set the default language of the app if there are no
        // locales for charge!
        this.I18n.missingTranslation = (arg) => {
            return this.I18n.translations['ja-JP'][arg]
        };

    }

    set(langKey, translationsObj) {
        if(!this.I18n.translations[langKey])  this.I18n.translations[langKey] = {};
        var _keys = Object.keys(translationsObj);
        _keys.map((key) => {
            this.I18n.translations[langKey][key] = translationsObj[key]
        });
    };

    getTranslations () {


        return this.I18n
    };
}

var serv = new I18nService();

module.exports = serv;