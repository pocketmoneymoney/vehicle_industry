
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

dbHandler.prototype.getPurchaseList = function(page, num, callback) {
    db.daoTemplate.getPageItems(this, page, num, callback);
};

dbHandler.prototype.getPurchaseAmount = function(callback) {
    this.count(callback);
};

module.exports = new dbHandler();
