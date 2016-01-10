/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var Pages = require('../pages/Pages.d');
var actionIcons = {};

actionIcons.toggle = require('../components/actions/ToggleMenu')


class NavigatorService {

    constructor(){
        this.manager = ''; //think in page instead of Components

        this.NavigationSubject = new Rx.Subject();
        this.NavigationSubject.subscribe((route)=> {
            switch(route.path) {
                case('login'):
                    this.manager.toRoute({
                        "component": Login,
                        "headerStyle": styles.facebookHeader
                    });
                    break;
                case('categories'):
                    this.manager.toRoute({
                        "component": <Text>View for Categories</Text>
                    });
                    break;
                case('post'):
                    this.manager.toRoute({
                        "component": PostView
                    })
            }
        });

        this.startRoute = {
            component : Pages.feed,
            leftCorner: actionIcons.toggle
        }
    }

    getFirstRoute() {
        return this.startRoute
    }

    setNavigationManager(managertoSet){
        if(!this.manager) this.manager = managertoSet;
    }

    getStream(){
        return this.NavigationSubject;
    }
}

var service = new NavigatorService();

module.exports = service;

