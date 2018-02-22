
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

dbHandler.prototype.addPosition = function(name, company, brief, callback) {
	var id = helper.uniqueID(name);
	var myDate = new Date();
	this.create({
		'id': id,
		'name': name,
		'company': company,
		'brief': brief,
		'time': myDate,
		'apply': []}, callback);
};

dbHandler.prototype.getPositionDetail = function(id, callback) {
    this.findOne({'id':id}, callback);
};

dbHandler.prototype.addPositionApply = function(id, applier, applierID, resume, callback) {
	var self = this;
	var myDate = new Date();
	this.findOne({'id':id}, function(err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var newApply = {
				'applier': applier,
				'id': applierID,
				'resume': resume,
				'time': myDate};
			var currentApply = data.apply;
			currentApply.append(newApply);
			self.update({'id':id}, {$set:{'apply':currentApply}}, {}, callback);
		}
	});
};

dbHandler.prototype.modifyPosition = function(id, name, company, brief, callback) {
	this.update({'id':id}, {$set:{
		'name': name,
		'company': company,
		'brief': brief}}, {}, callback);
};

dbHandler.prototype.deletePosition = function(id, callback) {
	this.remove({'id':id}, callback);
};

module.exports = new dbHandler();
