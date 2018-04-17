
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
		'username':		{ type:String, unique:true, required:true },
		'password':		{ type:String, required:true },
		'role':			{ type:String, required:true },
		'id':			{ type:String, required:true }
	}, 'users', 'users');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.deleteUser = function (id, callback) {
    this.remove({'id':id}, callback);
};

module.exports = new dbHandler();
