/**
 * Created by epotignano on 17/01/16.
 */
var React = require('react-native');
var PostElement = require('../components/posts/PostElement');
var GridView = require('react-native-grid-view');

var {
    StyleSheet
    } = React;
    
var styles = StyleSheet.create({
    container : {
        backgroundColor: '#F7F7F7'
    }
});  

var Results = React.createClass ({
    render(){
        return(
            <GridView
                items={this.props.data['posts']}
                itemsPerRow={2}
                renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData }></PostElement>}
                style={styles.container}
            />
        )
    }
});

module.exports = Results;
