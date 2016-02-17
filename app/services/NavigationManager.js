/**
 * Created by epotignano on 10/01/16.
 */

var Rx = require('rx');
var React = require('react-native');
var Pages = require('../pages/Pages.d');
var Login = require('../pages/Login');
var ResponsiveImage = require('react-native-responsive-image');
var storage = require('./Storage').getInstance();

var toggle = require('../components/actions/ToggleMenu');
var navigation = require('../components/navigation/Navigation.d');
var {
    View,
    StyleSheet,
    Text,
    Image
} = React;

import { api } from "../utils/api/Api.d";

var styles = StyleSheet.create({
    facebookHeader : {
        backgroundColor: "#2A406B",
        color: "#FFFFFF",
        borderBottomWidth: 1,
        borderColor : "#2A406B"
    },
    generalHeader : {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderColor : "#e5e5e5"
    },
    logo : {
        height: 50
    }
});

var imageSizes ={
    height: 50,
    width: 180
};

var logo = React.createClass({
  render: function() {
    return <ResponsiveImage style={styles.logo}
                            source={{uri: 'http://sof.tokyo/wp-content/uploads/2015/06/logo.png'}}
                            initHeight={imageSizes.height}
                            initWidth={imageSizes.width}
            />;
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
            "headerStyle": styles.generalHeader,
            titleComponent: logo
        };

        this.routerProxy = () => {
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
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;
                case('search'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.search,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    });
                break;
                case('post'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.post,
                        "passProps": route.params,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    });
                break;

                case('searchResults'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.searchResults,
                        "passProps": route.params,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    });
                break;
                case('profile'):
                    this.manager.toRoute({
                        "leftCorner": navigation.back,
                        "component" : Pages.profile,
                        "rightCorner": toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    });
                break;
                case('schools'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.schools,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;
                case('styles'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.styles,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('postsByStyle'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.byStyle,
                        rightCorner: toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('postsBySex'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.bySex,
                        rightCorner: toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('categoriesMenu'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.categoriesPage,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;
                case('ranking'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.ranking,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;

                case('newPosts'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.newPosts,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader
                    })
                break;

                case('schoolProfile'):
                    this.manager.toRoute({
                        "leftCorner": navigation.back,
                        "component": Pages.schoolProfile,
                        "rightCorner": toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;

                case('news'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.news,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;

                case('aboutSof'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.about,
                        rightCorner: toggle,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;
                case('schoolsCheckout'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.schoolBooksCheckout,
                        rightCorner: toggle,
                        "passProps": route.params,
                        "headerStyle": styles.generalHeader,
                        titleComponent: logo
                    })
                break;
                case('uploadImage'):
                    this.manager.toRoute({
                        leftCorner: navigation.back,
                        "component": Pages.uploadImage,
                        rightCorner: toggle
                    })
                break;


                // case('news'):
                //     this.manager.toRoute({
                //         leftCorner: navigation.back,
                //         "component": Pages.news,
                //         "passProps": route.params,
                //         rightCorner: toggle,
                //         "headerStyle": styles.generalHeader,
                //         titleComponent: logo
                //     });
                // break;
            }
        });
    };

    getFirstRoute() {
        return this.startRoute
    }

    setNavigationManager(managertoSet){
        if(!this.manager) {
            console.warn('Going to asign!');
            this.manager = managertoSet;
        }
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