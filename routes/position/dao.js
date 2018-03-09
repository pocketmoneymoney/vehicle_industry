
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'name':			{ type:String, required:true },
		'company':		String,
		'companyBrief':	String,
		'contact':		String,
		'brief':		String,
		'requirement':	String,
		'location':		String,
		'salary':		String,
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

dbHandler.prototype.getMyPositionList = function(page, num, id, callback) {
  	var conditions = {apply: {$elemMatch: {personID: id}}};
    db.daoTemplate.getPageItems.call(this, page, num, callback, conditions);
};

dbHandler.prototype.addPosition = function(name, company, companyBrief, contact, brief, 
										   requirement, location, salary, callback) {
	var id = helper.uniqueID(name);
	var myDate = new Date();
	this.create({
		'id': id,
		'name': name,
		'company': company,
		'companyBrief': companyBrief,
		'contact': contact,
		'brief': brief,
		'requirement': requirement,
		'location': location,
		'salary': salary,
		'time': myDate,
		'apply': []}, callback);
};

dbHandler.prototype.getPositionDetail = function(id, callback) {
    this.findOne({'id':id}, callback);
};

dbHandler.prototype.addPositionApply = function(id, name, phone, email, personID, 
  												personRole, resume, callback) {
	var myDate = new Date();
	var newApply = {
		'applierName': name,
		'personID': personID,
		'personRole': personRole,
	    'phone': phone,
	    'email': email,
		'resume': resume,
		'applyTime': myDate};
	this.update({'id':id}, {$push:{'apply':newApply}}, {}, callback);
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

dbHandler.prototype.modifyPosition = function(id, name, company, companyBrief, contact, 
										brief, requirement, location, salary, callback) {
	this.update({'id':id}, {$set:{
		'name': name,
		'company': company,
		'companyBrief': companyBrief,
		'contact': contact,
		'brief': brief,
		'requirement': requirement,
		'location': location,
		'salary':salary}}, {}, callback);
};

dbHandler.prototype.deletePosition = function(id, callback) {
	this.remove({'id':id}, callback);
};


dbHandler.prototype.search = function (keyword, page, num, callback) {
	var self = this;
	var result = [];

	var priority1 = [];
	var priority2 = [];
	var priority3 = [];
	var priority4 = [];

	var condition = {};
	var reg = new RegExp(keyword, 'i');
	condition = {'$or':[{'name': {$regex: reg}},
						{'company': {$regex: reg}},
						{'brief': {$regex:reg}}]};

	self.model
	.find(condition, null, {sort: {_id: -1}})
	.limit(300)
	.sort({'id':-1})
	.exec(function(err, data) {
		if (err || !data) {
			callback(err, []);
		} else {
			for (var index = 0; index < data.length; index++) {
				var position = data[index];	
				if (position.name && position.name.search(keyword) >= 0) {
					priority1.push(position);
				} else if (position.company && position.company.search(keyword) >= 0) {
					priority2.push(position);
				} else if (position.brief && position.brief.search(keyword) >= 0) {
					priority3.push(position);
				} else {
					priority4.push(position);
				}
			}

			result = result.concat(priority1).concat(priority2).concat(priority3).
							concat(priority4);
			var resultAmount = result.length;
			var currentPageResult = result.slice(page, page + num);
			callback(null, {'data':currentPageResult, 'amount':resultAmount});
		}
	});
};

module.exports = new dbHandler();
