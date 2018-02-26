
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'name':			{ type:String, required:true },
		'company':		String,
		'brief':		String,
		'location':		String,
		'time':			Date,
		'apply':		Array
	}, 'position', 'position');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getPositionList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getPositionAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.addPosition = function(name, company, brief, location, callback) {
	var id = helper.uniqueID(name);
	var myDate = new Date();
	this.create({
		'id': id,
		'name': name,
		'company': company,
		'brief': brief,
		'location': location,
		'time': myDate,
		'apply': []}, callback);
};

dbHandler.prototype.getPositionDetail = function(id, callback) {
    this.findOne({'id':id}, callback);
};

dbHandler.prototype.addPositionApply = function(id, name, phone, email, personID, 
  personRole, resume, callback) {
	var self = this;
	var myDate = new Date();

	var newApply = {
		'applierName': name,
		'personID': personID,
		'personRole': personRole,
	    'phone': phone,
	    'email': email,
		'resume': resume,
		'applyTime': myDate};
	self.update({'id':id}, {$push:{'apply':newApply}}, {}, callback);
};

dbHandler.prototype.getPositionAppliers = function(id, callback) {
	this.findOne({'id':id}, function(err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['apply']);
		}
	});
};

dbHandler.prototype.modifyPosition = function(id, name, company, brief, location, callback) {
	this.update({'id':id}, {$set:{
		'name': name,
		'company': company,
		'brief': brief,
		'location': location}}, {}, callback);
};

dbHandler.prototype.deletePosition = function(id, callback) {
	this.remove({'id':id}, callback);
};

module.exports = new dbHandler();
