/**
 * Created by mmasuyama on 1/8/2016.
 */

var actions = require('../actions/Sidebar');

var Rx = require("rx");
console.log(Rx);
var SidebarSubject = new Rx.Subject() ;
module.exports = SidebarSubject;

