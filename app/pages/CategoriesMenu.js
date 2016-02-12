/**
 * Created by epotignano on 10/01/16.
 */

var React = require('react-native');
var CategoriesList = require('../components/categories/CategoriesList');
var CategoriesPage = React.createClass ({
    render(){
        return(
            <CategoriesList/>
        )
    }
});
module.exports = CategoriesPage;

