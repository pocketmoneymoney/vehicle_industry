
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'name':			String,
		'phone':		String,
		'productName':	String,
		'expire':		String,
		'type':			String,
		'detailType':	String,
		'size':			String,
		'material':		String,
		'method':		String,
		'totalAmount':	String,
		'money':		String,
		'moneyUnit':	String,
		'description':  String,
		'publisherID':	String,
		'publisherRole':String,
		'supplierCertification':	String,
		'supplierLocation':			String,
		'supplierSales':			String,
		'supplierRequirement':		String,
		'picture':			String,
		'createTime':		Date,
		'apply':			Array
	}, 'purchase', 'purchase');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getPurchaseList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getPurchaseAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.addPurchase = function(basic, detail, publisher, supplier, 
										   picture, callback) {
	var id = helper.uniqueID(basic.name);
	var myDate = new Date();
	this.create({
		'id': id,
		'name': basic.name,
		'phone': basic.phone,
		'productName': basic.productName,
		'expire': basic.expire,
		'type': basic.type,
		'detailType': basic.detailType,
		'size': detail.size,
		'material': detail.meterial,
		'method': detail.method,
		'totalAmount': detail.totalAmount,
		'money': detail.money,
		'moneyUnit': detail.moneyUnit,
		'description': detail.description,
		'publisherID': publisher.publisherID,
		'publisherRole': publisher.publisherRole,
		'supplierCertification': supplier.supplierCertification,
		'supplierLocation': supplier.supplierLocation,
		'supplierSales': supplier.supplierSales,
		'supplierRequirement': supplier.supplierRequirement,
		'picture': picture,
		'createTime': myDate,
		'apply': []}, callback);
};

dbHandler.prototype.getPurchaseDetail = function(id, callback) {
    this.findOne({'id':id}, callback);
};

dbHandler.prototype.addPurchaseApply = function(id, name, phone, email, company, 
										position, comment, personID, personRole, callback) {
	var self = this;
	var myDate = new Date();

	var newApply = {
		'applierName': name,
		'personID': personID,
		'personRole': personRole,
		'phone': phone,
	    'email': email,
	    'position': position,
	    'comment': comment,
		'applyTime': myDate};
	self.update({'id':id}, {$push:{'apply':newApply}}, {}, callback);
};

dbHandler.prototype.getPurchaseAppliers = function(id, callback) {
	this.findOne({'id':id}, function(err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['apply']);
		}
	});
};

dbHandler.prototype.modifyPurchase = function(id, basic, detail, supplier, picture, callback) {
	var fields = {
		'name': basic.name,
		'phone': basic.phone,
		'productName': basic.productName,
		'expire': basic.expire,
		'type': basic.type,
		'detailType': basic.detailType,
		'size': detail.size,
		'material': detail.meterial,
		'method': detail.method,
		'totalAmount': detail.totalAmount,
		'money': detail.money,
		'moneyUnit': detail.moneyUnit,
		'description': detail.description,
		'supplierCertification': supplier.supplierCertification,
		'supplierLocation': supplier.supplierLocation,
		'supplierSales': supplier.supplierSales,
		'supplierRequirement': supplier.supplierRequirement
	};

	if (picture) {
		fields['picture'] = picture;
	}
	this.update({'id':id}, {$set:{fields}}, {}, callback);
};

dbHandler.prototype.deletePurchase = function(id, callback) {
	this.remove({'id':id}, callback);
};

dbHandler.prototype.addPurchase = function (obj, callback) {
	this.create(obj, callback);
};

module.exports = new dbHandler();
