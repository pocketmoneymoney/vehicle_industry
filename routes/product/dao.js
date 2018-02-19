
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

var supplier = require('../supplier');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'ownerID':		String,
		'name':			String,
		'usage':		String,
		'capacity':		String,
		'customer':		String
	}, 'product', 'product');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getProduct = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.updateProduct = function (id, ownerID, name, usage, 
											  capacity, customer, callback) {
	var self = this;
	this.update({'id':id}, {$set: {
		'id':id,
		'ownerID': ownerID,
		'name':	name,
		'usage': usage,
		'capacity': capacity,
		'customer': customer}}, {upsert:true}, function (err) {
		if (err) {
			self.remove({'id':id});
			callback(err);
		} else {
			supplier.addProduct(ownerID, id, callback);
		}
	});
}

module.exports = new dbHandler();

