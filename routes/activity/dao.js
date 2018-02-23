
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
         'id':      String,
		     'name':		String,
		     'location': 	String,
		     'time':		Date,
		     'type':		String,
		     'publishedTime':	Date,
		     'bigPoster':   String,
		     'smallPoster': String,
		     'tinyPoster':  String,
		     'applications': Object,
		}, 'activity', 'activity');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getActivityList = function(type, page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback, {type: type});
};

dbHandler.prototype.getAllActivity = function(callback) {
    this.find({}, null, null, callback);
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

dbHandler.prototype.addActivity = function (name, id, location, time, type, bigPoster, smallPoster, tinyPoster, callback) {
	this.create({
		name: name,
		id: id,
		location: location,
		time: time,
    type: type,
    bigPoster: bigPoster,
    smallPoster: smallPoster,
    tinyPoster: tinyPoster,
    publishedTime: new Date()
	}, callback);
};

dbHandler.prototype.addApplication = function (activityId, userId, name, company, phone, email, comment, callback) {
  var application = {userId: userId, name: name, company: company, phone: phone, email: email, comment: comment};
  console.log(activityId);
  this.update({'id': activityId}, {$push: {'applications': application}}, null, callback);
};

module.exports = new dbHandler();
