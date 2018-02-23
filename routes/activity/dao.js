
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
		     'name':		String,
		     'location': 	String,
		     'time':		Date,
		     'type':		String,
		     'publishedTime':	Date,
		     'bigPoster':   String,
		     'smallPoster': String,
		     'tinyPoster':  String,
		     'application': Object,
		}, 'activity', 'activity');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getActivityList = function(type, page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback, {type: type});
};

dbHandler.prototype.getActivityAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getActivityDetail = function (id, callback) {
    this.findOne({'_id':id}, callback);
};

dbHandler.prototype.addActivity = function (name, id, alocation, time, type, bigPoster, smallPoster, tinyPoster, callback) {
	this.create({
		name: name,
		id: id,
		location: alocation,
		time: time,
    type: type,
    bigPoster: bigPoster,
    smallPoster: smallPoster,
    tinyPoster: tinyPoster,
    publishedTime: new Date()
	}, callback);
};

module.exports = new dbHandler();
