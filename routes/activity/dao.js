
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

dbHandler.prototype.getAllActivity = function(userId, page, num, callback) {
    var conditions = {};
    if (userId) {
      conditions = {apply: {$elemMatch: {userId: userId}}};
    }
    db.daoTemplate.getPageItems.call(this, page, num, callback, conditions);
};

dbHandler.prototype.getActivityAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getOneActivityAmount = function(type, callback) {
    this.count({'type':type}, callback);
};

dbHandler.prototype.getMyActivityList = function(page, num, id, callback) {
  	var conditions = {apply: {$elemMatch: {personID: id}}};
    db.daoTemplate.getPageItems.call(this, page, num, callback, conditions);
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

dbHandler.prototype.addActivityApply = function (id, name, email, phone, company, position, 
  comment, personID, personRole, callback) {
	var self = this;
	var myDate = new Date();
  	var newApply = {
		'applierName': name,
		'position': position,
		'personID': personID,
		'personRole': personRole,
		'company': company,
		'phone': phone,
		'email': email,
		'comment': comment};
	self.update({'id':id}, {$push:{'apply':newApply}}, {}, callback);
};

dbHandler.prototype.getActivityAppliers = function(id, callback) {
	this.findOne({'id':id}, function(err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['apply']);
		}
	});
};


module.exports = new dbHandler();
