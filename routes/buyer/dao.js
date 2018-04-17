
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var userDB = require("../user/dao");

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'owner':		{ type:String, unique:true, required:true },
		'name':			String,
		'phone':		String,
		'email':		String
	}, 'buyer', 'buyer');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.addBuyer = function (owner, id, name, phone, email, callback) {
	this.create({
		'id': id,
		'owner': owner,
		'name': name,
		'phone': phone,
		'email': email
	}, callback);
};

dbHandler.prototype.getBuyerList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getBuyerAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getBuyerDetail = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.modifyBuyer = function (id, person, email, phone, callback) {
	var fields = {
		'name': person,
		'email': email,
		'phone': phone
	};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};
		
dbHandler.prototype.deleteBuyer = function (id, callback) {
	var self = this;
	userDB.deleteUser(id, function() {
    	self.remove({'id':id}, callback);
	});
};

module.exports = new dbHandler();
