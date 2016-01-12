/**
 * Created by epotignano on 11/01/16.
 */

var I18n = require('react-native-i18n');
class I18nService {
    constructor(){
        this.I18n = I18n;
        this.I18n.translations = I18n.translations;
    }

    set(langKey, translationsObj) {

        if(!this.I18n.translations[langKey])  this.I18n.translations[langKey] = {};

        var _keys = Object.keys(translationsObj);
        _keys.map((key) => {
            this.I18n.translations[langKey][key] = translationsObj[key]
        });

        console.warn(JSON.stringify(I18n.translations));
    };

    getTranslations () {
        return this.I18n
    };
}

var serv = new I18nService();

module.exports = serv;