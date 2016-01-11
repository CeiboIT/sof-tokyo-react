/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var React = require('react-native');
var Pages = require('../pages/Pages.d');
var Login = require('../pages/Login');
var actionIcons = {};
actionIcons.toggle = require('../components/actions/ToggleMenu')

var {
    StyleSheet
} = React



var styles = StyleSheet.create({
    facebookHeader : {
        backgroundColor: "#2A406B"
    }
})

class NavigatorService {

    constructor(){
        this.manager = ''; //think in page instead of Components

        this.NavigationSubject = new Rx.Subject();

        // Routes definition here

        this.startRoute = {
            component : Pages.feed,
            leftCorner: actionIcons.toggle
        };

        this.NavigationSubject.subscribe((route)=> {
            switch(route.path) {
                case('login'):
                    this.manager.toRoute({
                        "component": Pages.login,
                        "headerStyle": styles.facebookHeader
                    });
                    break;
                case('post'):
                    this.manager.toRoute({
                        "component": Pages.post,
                        "passProps": route.params
                    })
                    break;
            };
        });

    };

    getFirstRoute() {
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

