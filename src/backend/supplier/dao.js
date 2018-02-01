
'use strict';

var mongoose = require('mongoose');
var db = require('../db');

function dbHandler() {
     db.handler.call(this, {
                     'company':		String,
		     'name':		String,
		     'material': 	String,
		     'size':		String,
		     'amount':		String,
		     'type':		String,
		     'publishedTime':	String,
		     'expiredTime':	String
		}, 'purchase', 'purchase');
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
    this.findOne({'_id':id}, callback);
}

module.exports = new dbHandler();
