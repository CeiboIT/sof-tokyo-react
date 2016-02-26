/**
 * Created by mmasuyama on 1/7/2016.
 */

var React = require('react-native');
var NavigationSubject= require("../../services/NavigationManager").getStream();
var SidebarSubject = require("../../services/Streams").getStream("Sidebar");

var {
    View,
    StyleSheet,
    TouchableHighlight,
    Text
    } = React;

var Icon = require('react-native-vector-icons/FontAwesome');


var styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {

        fontSize: 35

    },
    close : {
        margin: 10
    },
    button : {
      padding: 5
    },
    login: {
        borderColor: '#00b9f7',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3
    },

    loginText: {
        color:"#00b9f7",
        fontSize: 25
    },

    registerText: {
        color:"#8e44ad",
        fontSize: 25
    },
    register: {
        borderColor: '#8e44ad',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 3
    }
});


var SitePanel = React.createClass ({


    login() {
        NavigationSubject.onNext({path: 'login'});
        SidebarSubject.onNext('close');
        return;
    },

    closeSidePanel() {
        SidebarSubject.onNext('close');
    },

    navigateToAbout() {
        NavigationSubject.onNext({path: 'aboutSof'});
        SidebarSubject.onNext('close');
    },

    navigateToSchools() {
        NavigationSubject.onNext({path: 'schools'});
        SidebarSubject.onNext('close');
    },

    navigateToWomen() {
        NavigationSubject.onNext({path: 'postsBySex', params: {sex: 'womens'} });
        SidebarSubject.onNext('close');
    },

    navigateToMen() {
        NavigationSubject.onNext({path: 'postsBySex', params: {sex: 'mens'}});
        SidebarSubject.onNext('close');
    },
    navigatoToStyle() {
        NavigationSubject.onNext({path: 'styles'});
        SidebarSubject.onNext('close');
    },
    
    navigateToContact() {
        NavigationSubject.onNext({path: 'contact'});
        SidebarSubject.onNext('close');
    },

    navigateToCategories() {
        NavigationSubject.onNext({path: 'categoriesMenu'});
        SidebarSubject.onNext('close');
    },

    navigateToNew() {

        NavigationSubject.onNext({path: 'newPosts'});
        SidebarSubject.onNext('close');
    },

    render(){

        return (
            <View style={styles.container}>
                <View>
                    <TouchableHighlight underlayColor={'transparent'} style={styles.close} onPress={this.closeSidePanel}>
                        <Text><Icon name="times" size={18}/></Text>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.buttonsContainer} collapse={ true } >
                    <TouchableHighlight onPress={ this.navigateToNew } underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>NEW</Text></TouchableHighlight>
                    <TouchableHighlight onPress={ this.navigateToWomen } underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>WOMEN</Text></TouchableHighlight>
                    <TouchableHighlight onPress={ this.navigateToMen } underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>MEN</Text></TouchableHighlight>
                    <TouchableHighlight onPress={ this.navigatoToStyle } underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>STYLE</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.navigateToCategories} underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>CATEGORY</Text></TouchableHighlight>

                    <TouchableHighlight  onPress={this.navigateToContact} underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>CONTACT</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.navigateToAbout} underlayColor={'transparent'} style={styles.button}><Text style={styles.buttonText}>ABOUT Sof</Text></TouchableHighlight>
                </View>
            </View>
        )
    }
});

SitePanel.StateProps = {
    User : React.PropTypes.object
};

module.exports = SitePanel;