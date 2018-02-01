
'use strict';

var mongoose = require('mongoose');
var db = require('../db');

function dbHandler() {
     db.handler.call(this, {
		     'title':		String,
                     'author':		String,
		     'PublishedTime':	String,
		     'content': 	String,
		     'picture':		Array
		}, 'interview', 'interview');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getInterviewList = function(page, num, callback) {
    db.daoTemplate.getPageItems(this, page, num, callback);
};

dbHandler.prototype.getInterviewAmount = function(callback) {
    this.count(callback);
};

module.exports = new dbHandler();
