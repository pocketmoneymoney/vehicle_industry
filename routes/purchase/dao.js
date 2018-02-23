
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
         'userId':  String,
         'id':      String,
		     'name':		String,
         'product': String,
         'phone':   String,
		     'expire':	String,
         'type':    String,
         'vehicle': Object,
		     'material': 	String,
		     'size':		String,
         'tech':    String,
		     'amount':		String,
         'money':     String,
         'moneyUnit': String,
         'comment':   String,
         'supplierAuth':  String,
         'supplierLoc':   String,
         'supplierSale':  String,
         'supplierComment': String,
         'avatar': String,
         'applications':  Object,
		     'publishedTime':	Date
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

dbHandler.prototype.getPurchaseDetail = function (id, callback) {
    this.findOne({'_id':id}, callback);
}

dbHandler.prototype.addPurchase = function (obj, callback) {
	this.create(obj, callback);
};

module.exports = new dbHandler();
