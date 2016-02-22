var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
    } = React;

var api = require("../../../utils/api/UserApi"),
    streamServ = require("../../../services/Streams");

var AuthorDisplay = React.createClass({

    getInitialState() {
        return  {
            isLoading: true,
            authorData: {}
        }
    },

    componentDidMount() {
        var AuthorStream = streamServ.getStream("Author" + this.props.id)
        AuthorStream.subscribe((author) => {
            this.setState({
                authorData : author.data
            })
        })

        api.getUser(this.props.id)
    }
})


AuthorDisplay.stateProps = {
    id : React.PropTypes.number
}

module.exports = AuthorDisplay;