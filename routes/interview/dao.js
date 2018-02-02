
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

// Reminder: For the content, we only response the first 100 chars of content
//           to make it shortly and briefly.
dbHandler.prototype.getInterviewList = function(page, num, callback) {
    var total = (page + 1) * num;
    var condition = {};
    var projection = 'title content';
    this.findMultiple(condition, projection, total, function (err, data) {
        if (err) {
           callback("Failed to get any data from database", []);
        } else {
           var items = data.slice(page, page + num);
           items.forEach(function(value, index, array) {
	       value['content'] = value['content'].substr(0, 100)
	   })
           callback(err, items);
        }
    });
};

dbHandler.prototype.getInterviewAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getInterviewDetail = function (id, callback) {
    this.findOne({'_id':id}, callback);
}

module.exports = new dbHandler();
