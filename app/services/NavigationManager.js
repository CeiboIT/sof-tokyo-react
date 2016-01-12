/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var React = require('react-native');
var Pages = require('../pages/Pages.d');
var Login = require('../pages/Login');

var toggle = require('../components/actions/ToggleMenu');
var navigation = require('../components/navigation/Navigation.d');


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

        this.NavigationSubject = new Rx.Subject();

        // Routes definition here

        this.startRoute = {
            leftCorner: navigation.back,
            component : Pages.feed,
            rightCorner: toggle
        };

        this.routerProxy = () => {
            console.warn(Object.keys(arguments))
            this.NavigationSubject.onNext.apply(this, arguments);
        };

        this.NavigationSubject.subscribe((route)=> {
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
                        "leftCorner": navigation.back,
                        "component" : Pages.profile,
                        "rightCorner": toggle
                    });
                break;

                case('schools'):
                    api.schools.LoadSchools();
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.schools,
                        rightCorner: toggle
                    })
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
        return this.NavigationSubject;
    }
}

var service = new NavigatorService();

module.exports = service;