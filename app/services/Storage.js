/**
 * Created by epotignano on 12/01/16.
 */

import Storage from 'react-native-storage';

var _storage = new Storage({
    size: 1000,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true
});

class StorageService {
    getInstance() {
        return _storage;
    }
}

var _serv= new StorageService();

module.exports = _serv;