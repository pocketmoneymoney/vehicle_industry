
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

var supplier = require('../supplier');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'ownerID':		String,
		'name':			String,
		'avatar':		{ String, default: ''}
	}, 'certification', 'certification');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getCertification = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.updateCertification = function (id, ownerID, name, avatar, callback) {
	var self = this;
    var fields = {'id':id, 'ownerID': ownerID, 'name':	name};

	if (avatar) {
		fields['avatar'] = avatar;
	}

	this.update({'id':id}, {$set: fields}, {upsert:true}, function (err) {
		if (err) {
			self.remove({'id':id});
			callback(err);
		} else {
			supplier.addCertification(ownerID, id, callback);
		}
	});
};

dbHandler.prototype.deleteCertification = function(id, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(null);
		} else {
			var ownerID = data['ownerID'];
			self.remove({'id':id}, function (err) {
				supplier.deleteCertification(ownerID, id, callback);
			});
		}
	});
}

module.exports = new dbHandler();

