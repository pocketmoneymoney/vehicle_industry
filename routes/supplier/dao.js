
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'owner':		{ type:String, unique:true, required:true },

		'person':		{
			'name':			String,
			'phone':		String,
			'email':		String,
		},

        'privilege':	{
			'verified': 	Boolean,
			'advertise': 	Boolean,
			'superior': 	Boolean,
		},

		'company': 		{
			'name':			String,
			'brief':		String,
			'product':		String,
			'customer':		String,
			'location':		String,
			'operator':		String,
			'assets':		String,
			'market':		String,
			'createTime':	String,
			'avatar':		String,
		},
		'product': 			Array,
		'equipment': 		Array,
		'certification':	Array
	}, 'supplier', 'supplier');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.addSupplier = function (owner, id, person, company, callback) {
	this.create({
		'id': id,
		'owner': owner,
		'person': {
			'name': 		person['name'],
			'phone': 		person['phone'],
			'email': 		person['email'],
		},
		'privilege': {
			'verified': 	false,
			'advertise': 	false,
			'superior': 	false,
		},
		'company': {
			'name':			company['name'],
			'product':		company['product'],
			'customer':		company['customer'],
		},
		'product': [],
		'equipment': []}, callback);
};

dbHandler.prototype.getSupplierList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getSupplierAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getSupplierDetail = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.getPersonInfo = function (id, callback) {
    this.findOne({'id':id}, 'person', callback);
}

dbHandler.prototype.getCompanyInfo = function (id, callback) {
    this.findOne({'id':id}, 'company', callback);
};

dbHandler.prototype.getPrevilegeInfo = function (page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.modifyPersonInfo = function (id, person, email, phone, callback) {
	var fields = {'person': {
		'name': person,
		'email': email,
		'phone': phone}
	};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};
		
dbHandler.prototype.modifyPrivilegeInfo = function (id, verified, advertise, 
	superior, callback) {
	var fields = {'privilege': {
		'verified': verified,
		'advertise': advertise,
		'superior': superior}
	};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};


dbHandler.prototype.modifyCompanyInfo = function (id, name, product, customer, 
	brief, location, market, createTime, operator, assets, callback) {
	var fields = {'company':
		{'name': name,
		 'product': product,
		 'customer': customer,
		 'brief': brief,
		 'location': location,
		 'market': market,
         'createTime': createTime,
         'operator': operator,
         'assets': assets,}};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};

dbHandler.prototype.deleteSupplier = function (id, callback) {
    this.remove({'id':id}, callback);
};

dbHandler.prototype.addProduct = function (id, productID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			if (!data['product']) {
				data['product'] = [];
			}
			data['product'].push(productID);
			self.update({'id':id}, {$set:{'product':data['product']}}, {}, callback);
		}
	});
};

module.exports = new dbHandler();
