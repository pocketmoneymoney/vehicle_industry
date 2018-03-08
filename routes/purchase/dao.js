
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'name':			String,
		'phone':		String,
		'email':		String,
		'productName':	String,
		'type':			String,
		'detailType':	String,
		'material':		String,
		'amount':		String,
		'description':  String,
		'supplier':  	String,
		'publisherID':	String,
		'publisherRole':String,
		'picture':			String,
		'createTime':		Date,
		'apply':			Array
	}, 'purchase', 'purchase');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getPurchaseList = function(page, num, id, callback) {
	if (id) {
      db.daoTemplate.getPageItems.call(this, page, num, callback, {'publisherID':id});
	} else {
      db.daoTemplate.getPageItems.call(this, page, num, callback);
	}
};

dbHandler.prototype.getPurchaseAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.addPurchase = function(basic, detail, publisher, picture, callback) {
	var id = helper.uniqueID(basic.productName);
	var myDate = new Date();
	this.create({
		'id': id,
		'name': basic.name,
		'phone': basic.phone,
		'email': basic.email,
		'productName': basic.productName,
		'type': basic.type,
		'detailType': basic.detailType,
		'material': detail.material,
		'amount': detail.amount,
		'description': detail.description,
		'supplier': detail.supplier,
		'publisherID': publisher.publisherID,
		'publisherRole': publisher.publisherRole,
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

dbHandler.prototype.getMyPurchaseList = function(page, num, id, callback) {
  	var conditions = {apply: {$elemMatch: {personID: id}}};
    db.daoTemplate.getPageItems.call(this, page, num, callback, conditions);
};

dbHandler.prototype.modifyPurchase = function(id, basic, detail, picture, callback) {
	var fields = {
		'name': basic.name,
		'phone': basic.phone,
		'email': basic.email,
		'productName': basic.productName,
		'type': basic.type,
		'detailType': basic.detailType,
		'material': detail.material,
		'amount': detail.amount,
		'description': detail.description,
		'supplier': detail.supplier,
	};

	if (picture) {
		fields['picture'] = picture;
	}
	this.update({'id':id}, {$set:{fields}}, {}, callback);
};

dbHandler.prototype.deletePurchase = function(id, callback) {
	this.remove({'id':id}, callback);
};

module.exports = new dbHandler();
