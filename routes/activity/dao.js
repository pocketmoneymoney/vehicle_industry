
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
        'id':      		{ type:String, unique:true, required:true},
	    'name':			String,
	    'location': 	String,
	    'postTime':		Date,
	    'startTime':	String,
	    'endTime':		String,
	 	'type':			String,
		'bigPoster':   	String,
	    'smallPoster': 	String,
	    'tinyPoster':  	String,
	    'apply':		Array
		}, 'activity', 'activity');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getActivityList = function(type, page, num, callback) {
	if (type) {
    	db.daoTemplate.getPageItems.call(this, page, num, callback, {type: type});
	} else {
    	db.daoTemplate.getPageItems.call(this, page, num, callback);
	}
};

dbHandler.prototype.getAllActivity = function(userId, callback) {
    var conditions = {};
    if (userId) {
      conditions = {apply: {$elemMatch: {userId: userId}}};
    }
    this.find(conditions, null, null, callback);
};

dbHandler.prototype.getActivityAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getActivityDetail = function (id, callback) {
    this.findOne({'id':id}, callback);
};

dbHandler.prototype.getLatestActivityDetail = function (type, callback) {
    this.findOne({'type': type}, null, {sort: {'_id': -1}}, callback);
};

dbHandler.prototype.deleteActivity = function(id, callback) {
  this.remove({'id': id}, callback);
};

dbHandler.prototype.addActivity = function (name, location, startTime, endTime, 
  type, bigPoster, smallPoster, tinyPoster, callback) {
	var newID = helper.uniqueID(name);
	this.create({
		name: name,
		id: newID,
		location: location,
		startTime: startTime,
		endTime: endTime,
    	type: type,
    	bigPoster: bigPoster,
    	smallPoster: smallPoster,
    	tinyPoster: tinyPoster,
    	postTime: new Date()
	}, callback);
};

dbHandler.prototype.modifyActivity = function (id, name, location, startTime, endTime, 
  type, bigPoster, smallPoster, tinyPoster, callback) {
    var self = this;
	this.find({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var fields = {};
			fields['name'] = name;
			fields['location'] = location;
			fields['startTime'] = startTime;
			fields['endTime'] = endTime;
			fields['type'] = type;

			if (bigPoster) {
			  fields['bigPoster'] = bigPoster;
			}
			if (smallPoster) {
			  fields['smallPoster'] = smallPoster;
			}
			if (tinyPoster) {
			  fields['tinyPoster'] = tinyPoster;
			}

			self.update({'id':id}, {$set: fields}, {}, callback);
		}
	});
};

dbHandler.prototype.addApply = function (id, name, email, phone, company, position, 
  comment, personID, role, callback) {
	var self = this;
	var myDate = new Date();
	this.findOne({'id':id}, function(err, data) {
		if (err || !data) {
			callback(err);
		} else {
  			var newApply = {
				'applierName': name,
				'position': position,
				'personID': personID,
				'role': role,
				'company': company,
				'phone': phone,
				'email': email,
				'comment': comment };
			var currentApply = data.apply;
			data.apply.push(newApply);
  			self.update({'id': id}, {$set: {'apply': currentApply}}, null, callback);
		}
	});
};

module.exports = new dbHandler();
