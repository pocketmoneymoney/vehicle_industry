
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
		'person':		{type:String, required:true},
		'id':			{type:String, unique:true, required:true},
		'company':		String,
		'email':		String,
		'phone':		String,
		'customer':		String,
		'product':		String,

		'brief':		String,
		'market':		String,
		'location':		String,
		'createTime':   String,
		'operator':		String,
		'assets':		String,

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

dbHandler.prototype.addSupplier = function (name, id, brief, location, customer,
	market, product, owner, avatar, certification, callback) {
	
	this.create({
		'name': name,
		'id': id,
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


dbHandler.prototype.modifySupplier = function (id, person, company, phone, email,
	product, customer, brief, location, market, createTime, operator, assets, owner, 
	callback) {
	var fields = {};

    if (person) { fields['person'] = person; }	
    if (company) { fields['company'] = company; }	
    if (phone) { fields['phone'] = phone; }	
    if (email) { fields['email'] = email; }	
    if (product) { fields['product'] = product; }	
    if (customer) { fields['customer'] = customer; }	
    if (brief) { fields['brief'] = brief; }	
    if (location) { fields['location'] = location; }	
    if (market) { fields['market'] = market; }	
    if (owner) { fields['owner'] = owner; }	

	if (createTime) { fields['createTime'] = createTime; }
	if (operator) { fields['operator'] = operator; }
    if (assets) { fields['assets'] = assets; }

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};

dbHandler.prototype.deleteSupplier = function (id, callback) {
    this.remove({'id':id}, callback);
}

module.exports = new dbHandler();
