'use strict';

var mongoose = require('mongoose');

var helper = require('../helper');
var db = require('../db');

function dbHandler() {
     db.handler.call(this, {
            'name':		{type:String, unique:true},
		     'id':      {type:String, unique:true}, 
		     'subtype':		Array,
		}, 'category', 'category');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getCategories = function(callback) {
    this.find(function (err, data) {
        if (err) {
            callback("Failed to get any data from database", []);
        } else {
            callback(err, data);
        }
    });
};

dbHandler.prototype.addCategory = function (category, callback) {
    var self = this;

    self.count({'name': category}, function(err, countData) {
        if (err) {
	    	callback("Failed to query database" + err);
		}

        if (countData == 0) {
	    	var id = helper.uniqueID(category);
            
        	self.create({'name':category, 'id':id}, function(err, data) {
				if (err) {
			    	callback(err);
        		} else {
                	callback();
				}
	    	});
        } else {
	    	callback("Category already exists");
		}
    });
};

dbHandler.prototype.modifyCategory = function (id, name, callback) {
	this.update({'id':id}, {$set : {'name': name}}, callback); 
}

dbHandler.prototype.deleteCategory = function (id, callback) {
    this.remove({'id':id}, callback);
}

dbHandler.prototype.getCategory = function(id, callback) {
    this.findOne({'id':id}, function (err, data) {
        if (err) {
            callback("Failed to get any data from database", []);
        } else {
            callback(err, data);
        }
    });
};

module.exports = new dbHandler();
