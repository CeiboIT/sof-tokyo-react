/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');

var GridView = require('react-native-grid-view');
var SchoolsStream = require("../services/Streams").getStream("Schools");



class Schools extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schools : []
        };

        SchoolsStream.subscribe((response) => {
            console.warn(Object.keys(response['schools']));
            this.setState({
                schools:response.schools
            })
        })
    }

    render(){
        return(
            <GridView
                items={this.state.schools}
                itemsPerRow={1}
                renderItem={(rowData) => <Text>{ rowData }</Text>}
            />
        )
    }
}

module.exports = Schools;

