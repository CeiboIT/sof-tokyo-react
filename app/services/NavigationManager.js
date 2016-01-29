/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var React = require('react-native');
var Pages = require('../pages/Pages.d');
var Login = require('../pages/Login');

var storage = require('./Storage').getInstance();

var toggle = require('../components/actions/ToggleMenu');
var navigation = require('../components/navigation/Navigation.d');
var {
    StyleSheet
} = React;

import { api } from "../utils/api/Api.d";

var styles = StyleSheet.create({
    facebookHeader : {
        backgroundColor: "#2A406B"
    },
    generalHeader : {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderColor : "#e5e5e5"
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
            rightCorner: toggle,
            "headerStyle": styles.generalHeader
        };

        this.routerProxy = () => {
            // console.warn(Object.keys(arguments));
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

                case('register'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.register,
                        "headerStyle": styles.facebookHeader
                    });
                break;

                case('feed') :
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        component : Pages.feed,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('search'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.search,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    });
                break;
                case('post'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.post,
                        "passProps": route.params,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    });
                break;
                case('searchResults'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.searchResults,
                        "passProps": route.params,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    });
                break;
                case('profile'):
                    this.manager.toRoute({
                        "leftCorner": navigation.back,
                        "component" : Pages.profile,
                        "rightCorner": toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader
                    });
                break;
                case('schools'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.schools,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('aboutSof'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.about,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
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
        return this.NavigationSubject;
    }
}

var service = new NavigatorService();

module.exports = service;