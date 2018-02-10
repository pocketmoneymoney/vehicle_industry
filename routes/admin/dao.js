
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'qrcode': String,
		'logo': String,
		'advertise': Array,
	}, 'admin', 'admin');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.updateQRCode = function (qrcode, callback) {
	this.update({}, {$set: {'qrcode':qrcode}}, {upsert:true}, callback);
};

dbHandler.prototype.getQRCode = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['qrcode']);
		}
	});
};

dbHandler.prototype.updateLogo = function (logo, callback) {
	this.update({}, {$set: {'logo':logo}}, {upsert:true}, callback);
};

dbHandler.prototype.getLogo = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['logo']);
		}
	});
};

dbHandler.prototype.addAdvertise = function(ad, callback) {
	var self = this;
	self.findOne({}, function (err, data) {
	 	if (err || !data) {
			callback(err);
		} else {
			var ads = data['advertise'];

			if (ads) {
				ads.push(ad);
			} else {
				ads = [ad];
			}
			self.update({}, {$set: {'advertise':ads}},
						{upsert:true}, callback);
		}
	});
};

dbHandler.prototype.getAdvertise = function (callback) {
    this.findOne({}, function (err, data) {
	 	if (err || !data) {
			callback(err);
		} else {
			callback(null, data['advertise']);
		}
	});
};

module.exports = new dbHandler();
