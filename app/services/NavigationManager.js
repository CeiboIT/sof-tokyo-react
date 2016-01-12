/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var React = require('react-native');
var Pages = require('../pages/Pages.d');
var Login = require('../pages/Login');

var toggle = require('../components/actions/ToggleMenu');
var navigation = require('../components/navigation/Navigation.d');

var NavigationSubject = new Rx.Subject();

var {
    StyleSheet
} = React


import Storage from 'react-native-storage';

var _storage = new Storage({
    size: 1000,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true
});

import { api } from "../utils/api/Api.d";

var styles = StyleSheet.create({
    facebookHeader : {
        backgroundColor: "#2A406B"
    }
});

class NavigatorService {




    constructor(){
        this.manager = ''; //think in page instead of Components



        // Routes definition here

        this.startRoute = {
            leftCorner: navigation.back,
            component : Pages.feed,
            rightCorner: toggle
        };

        NavigationSubject.subscribe((route)=> {
            switch(route.path) {
                case('back'):
                    this.manager.toBack(route.params);
                    break;
                case('login'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.login,
                        "headerStyle": styles.facebookHeader
                    });
                    break;
                case('post'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.post,
                        "passProps": route.params,
                        rightCorner: toggle
                    });
                break;

                case('profile'):
                    this.manager.toRoute({
                        "component" : Pages.profile
                    });
                break;

                case('schools'):
                    api.schools.LoadSchools();
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.schools,
                        rightCorner: toggle
                    })
                break;
            }
        });
    };


    getFirstRoute() {
        api.posts.LoadPosts(1);
        return this.startRoute
    }

    setNavigationManager(managertoSet){
        if(!this.manager) this.manager = managertoSet;
    }

    getNavigationManager(managertoSet){
        if(!this.manager) this.manager = managertoSet;
    }

    getStream(){
        return NavigationSubject;
    }
}

var service = new NavigatorService();

module.exports = service;