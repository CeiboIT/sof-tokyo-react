/**
 * Created by epotignano on 12/03/16.
 */


import React, {
    Component,PropTypes, ListView,
    View, Text, TouchableHighlight, StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var styles = StyleSheet.create({

    element : {
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
        padding: 15,
        marginLeft: 5, marginRight: 5,
        backgroundColor: 'white'
    },

    textElement : {
        alignItems: 'flex-end',
        justifyContent: "flex-end",
        flex:6
    },

    icon : {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    iconContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    selectableContainer : {
        flexDirection: 'row'
    }
});

class CeiboSelectElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    toggleSelection() {
        const { element, valueKey } = this.props;
        if(!this.state.selected) {
            this.props.selectedElementsCollection.push({[valueKey] : element[valueKey]})
        }else {
            var _index = this.props.selectedElementsCollection.indexOf(element[valueKey]);
            this.props.selectedElementsCollection.splice(_index,0);
        }

       this.setState({
           selected : !this.state.selected
       })
    }

    render() {

        const { element, valueKey, labelKey, iconName, iconSize, iconColor, selectedElements} = this.props;
        let { selected } = this.state;

        return (
            <TouchableHighlight underlayColor={'transparent'} style={styles.element} onPress={this.toggleSelection.bind(this)}>
                <View style={styles.selectableContainer}>
                    <View style={styles.iconContainer}>
                        {
                            this.state.selected && iconName && <Icon style={styles.icon} name={ iconName } color={ iconColor || 'black' } size={ iconSize || 10} />
                        }
                    </View>


                    <Text style={ styles.textElement }>
                        {element[labelKey]}
                    </Text>

                </View>
            </TouchableHighlight>
        )
    }
}

CeiboSelectElement.propTypes = {
    element: PropTypes.any.isRequired,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string
};

CeiboSelectElement.stateTypes = {
    selectedElements: PropTypes.any
};

class CeiboSelect extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            selectedElements : [],
            list : ds.cloneWithRows(this.props.list || [])
        }
    }

    render()  {
        const { valueKey, labelKey, iconName, iconSize, iconColor } = this.props;
        return (
            <ListView
                dataSource = { this.state.list }
                renderRow = {(rowData) => {
                     return <CeiboSelectElement
                     element={rowData}
                     selectedElementsCollection = { this.state.selectedElements }
                     valueKey={valueKey}
                     iconName={iconName} iconSize={iconSize} iconColor={iconColor}
                     labelKey={labelKey}
                     />
                }}
            >
            </ListView>
        )

    }
}

CeiboSelect.propTypes = {
    list: PropTypes.any.isRequired,
    valueKey: PropTypes.any,
    labelKey: PropTypes.any,
    iconName: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string
};

export default CeiboSelect;