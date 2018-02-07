
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'qrcode':		String
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

module.exports = new dbHandler();
