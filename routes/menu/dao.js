'use strict';

var mongoose = require('mongoose');
var _ = require('underscore');

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
	    	callback("Failed to query database");
		} else {
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

dbHandler.prototype.getSubtype = function(id, callback) {
    this.findOne({'subtype.id':id}, function (err, data) {
        if (err || !data) {
			callback("Failed to get any data from db", []);
		} else {
			var subtype = _.find(data['subtype'], function (iter) {
				return iter['id'] == id; });
			callback(err, subtype);
		}
    });
};


dbHandler.prototype.addSubtype = function (categoryID, subtypeName, items, callback) {
	var self = this;

	self.findOne({'id':categoryID}, function(err, category) {
		if (err || !category) {
			callback("Failed to get category from dabase");
		} else {
			var existedSubtype = _.find(category['subtype'], function(subtype) {
				return subtype.name == subtypeName;
			});

			if (existedSubtype) {
				callback("Subtype already exists");
			} else {
				var subtypeID = helper.uniqueID(subtypeName);
				var itemsWithID = 
					_.map(items, function(item) {
						return {
							'id': helper.uniqueID(item['name']),
						 	'name': item };
					});
				var newSubtype = {
					'name': subtypeName,
					'id': subtypeID,
					'items': itemsWithID};
				category['subtype'].push(newSubtype);
				self.update(
					{'id':categoryID}, 
					{$set: {'subtype':category['subtype']}}, 
					callback);
			}
		}
	});
}


dbHandler.prototype.modifySubtype = function (categoryID, subtypeName, 
											  subtypeID, items, callback) {
	var self = this;

	self.findOne({'id':categoryID}, function(err, category) {
		if (err || !category) {
			callback("Failed to get category from dabase");
		} else {
			var existedSubtype = _.find(category['subtype'], function(subtype) {
				return subtype.id == subtypeID;
			});
			
			if (!existedSubtype) {
				callback("Failed to get existed subtype");
			} else {
				existedSubtype['name'] = subtypeName;
				existedSubtype['item'] = 
					_.map(items, function(item) {
						var itemID = item['id'] ? item['id'] : 
												  helper.uniqueID(item['name']);
						return {
							'name': item['name'],
							'id': itemID
						};
					});

				self.update(
					{'id':categoryID}, 
					{$set: {'subtype':category['subtype']}}, 
					callback);
			}
		}
	});
};


dbHandler.prototype.deleteSubtype = function (categoryID, subtypeID, callback) {
	var self = this;

	self.findOne({'id':categoryID}, function(err, category) {
		if (err || !category) {
			callback("Failed to get category from dabase");
		} else {
			var existedSubtype = _.find(category['subtype'], function(subtype) {
				return subtype.id == subtypeID;
			});
			
			if (!existedSubtype) {
				callback("Subtype not exist");
			} else {
				var newSubtypes = 
					_.filter(category['subtype'], function(subtype) {
						return subtype['id'] && subtype['id'] != subtypeID;
					});

				self.update(
					{'id':categoryID}, 
					{$set: {'subtype':newSubtypes}},
					callback);
			}
		}
	});	
};

module.exports = new dbHandler();
