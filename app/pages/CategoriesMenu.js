var React = require('react-native'),
    CategoriesList = require('../components/categories/CategoriesList');
    
var CategoriesPage = React.createClass ({
    render(){
        return(
            <CategoriesList/>
        )
    }
});
module.exports = CategoriesPage;

