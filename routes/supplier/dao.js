
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'name':			String,
		'id':			{type:String, unique:true},
		'brief':		String,
		'customer':		String,
		'market':		String,
		'product':		String,
		'location':		String,
		'owner':		String,
		'avatar':		String,
		'certification':	Array
	}, 'supplier', 'supplier');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getSupplierList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getSupplierAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getSupplierDetail = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.addSupplier = function (name, brief, location, customer,
	market, product, owner, avatar, certification, callback) {
	
	this.create({
		'name': name,
		'id': helper.uniqueID(name),
		'brief': brief,
		'location': location,
		'customer': customer,
		'market': market,
		'product': product,
		'owner': owner,
		'avatar': avatar,
		'certification': certification
		}, callback);
};


dbHandler.prototype.modifySupplier = function (id, name, brief, location, customer,
	market, product, owner, avatar, certification, callback) {
	
	this.update({'id':id}, {$set: {
		'name': name,
		'id': helper.uniqueID(name),
		'brief': brief,
		'location': location,
		'customer': customer,
		'market': market,
		'product': product,
		'owner': owner,
		'avatar': avatar,
		'certification': certification
		}}, callback);
};

dbHandler.prototype.deleteSupplier = function (id, callback) {
    this.remove({'id':id}, callback);
}

module.exports = new dbHandler();
