
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

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

dbHandler.prototype.findUsername = function (id, callback) {
	this.findOne({'id':id}, callback);
}

dbHandler.prototype.findUser = function (name, callback) {
	this.findOne({'username':name}, callback);
}

dbHandler.prototype.deleteUser = function (id, callback) {
    this.remove({'id':id}, callback);
};

dbHandler.prototype.updatePassword = function (username, id, password, callback) {
	var self = this;
	bcrypt.genSalt(10, function (err, salt) {
    	if (err) {
			callback(err, null);
      	}
       	bcrypt.hash(password, salt, null, function (err, hash) {
        	if (err) {
				callback(err, null);
          	}
			self.update({'username':username, 'id':id}, 
						{$set:{'password': hash}}, {}, callback);
		});
	});
};

module.exports = new dbHandler();

