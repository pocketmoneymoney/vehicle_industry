
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
		     'published':	String,
		     'expired':		String
		}, 'purchase', 'purchase');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getPurchaseOrders = function(start, num, callback) {
    this.findMultiple(num, callback);
};

dbHandler.prototype.getPurchaseOrdersAmount = function(callback) {
    this.count(callback);
};

module.exports = new dbHandler();
