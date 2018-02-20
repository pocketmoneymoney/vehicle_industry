
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

var supplier = require('../supplier');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'ownerID':		String,
		'name':			String,
		'type':			String,
		'provider':		String,
	}, 'equipment', 'equipment');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getEquipment = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.updateEquipment = function (id, ownerID, name, type,
											  provider, callback) {
	var self = this;
	this.update({'id':id}, {$set: {
		'id':id,
		'ownerID': ownerID,
		'name':	name,
		'type': type,
		'provider': provider}}, {upsert:true}, function (err) {
		if (err) {
			self.remove({'id':id});
			callback(err);
		} else {
			supplier.addEquipment(ownerID, id, callback);
		}
	});
};

dbHandler.prototype.deleteEquipment = function(id, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(null);
		} else {
			var ownerID = data['ownerID'];
			self.remove({'id':id}, function (err) {
				supplier.deleteEquipment(ownerID, id, callback);
			});
		}
	});
}

module.exports = new dbHandler();

