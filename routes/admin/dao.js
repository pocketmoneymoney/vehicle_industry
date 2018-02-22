
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');
var Schema = mongoose.Schema;

function dbHandler() {
     db.handler.call(this, {
		'qrcode': 		{ type:String, default: ''},
		'logo': 		{ type:String, default: ''},
		'advertise': 	{ type:Array, default: []},
		'category': 	{ type:Schema.Types.Mixed, default: {}}
	}, 'admin', 'admin');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.getCategory = function (categoryID, callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data.category[categoryID]);
		}
	});
};

dbHandler.prototype.getCategories = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data.category);
		}
	});
};

dbHandler.prototype.getCategoryList = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var cateList = [];			
			for (var categoryName in data.category) {
				var category = data.category[categoryName];
				var categoryID = category.id;
				var hasSubtype = false;
				for (var subtypeName in category) {
					if (subtypeName == 'id') {
						continue;
					} else {
						hasSubtype = true;
					}

					var subtype = category[subtypeName];	
					var subtypeID = subtype.id;
					var hasItem = false;
					for (var itemName in subtype) {
						if (itemName == 'id') {
							continue;
						} else {
							hasItem = true;
						}
						cateList.push({'categoryName':categoryName,
										 'categoryID':  categoryID,
										 'subtypeName': subtypeName,
										 'subtypeID':   subtypeID,
										 'itemName':    itemName,
									 	 'itemID':      subtype[itemName].id});
					}
					
					if (!hasItem) {
						cateList.push({'categoryName':categoryName,
										 'categoryID':  categoryID,
										 'subtypeName': subtypeName,
										 'subtypeID':   subtypeID,
										 'itemName':    '',
									 	 'itemID':      ''});
					}
				}

				if (!hasSubtype) {
					cateList.push({'categoryName':categoryName,
								   'categoryID':  categoryID,
								   'subtypeName': '',
								   'subtypeID':   '',
								   'itemName':    '',
								   'itemID':      ''});
				}
			}
			callback(null, cateList);
		}
	});
};

dbHandler.prototype.getCategoryName = function (categoryID, subtypeID,
  itemID, callback) {
	var self = this;
	this.findOne({}, function (err, data) {
		if (err || !data || !data.category) {
			callback(err);
		} else {
			var result = {};
			for (var categoryName in data.category) {
				var category = data.category[categoryName];
				if (category.id == categoryID) {
					result['categoryName'] = categoryName;
					if (subtypeID) {
						for (var subtypeName in category) {
							var subtype = category[subtypeName];
							if ((subtype.id == subtypeID) && (subtypeName != 'id')) {
								result['subtypeName'] = subtypeName;
								if (itemID) {
									for (var itemName in subtype) {
										var item = subtype[itemName];
										if ((item.id == itemID) && (itemName != 'id')) {
											result['itemName'] = itemName;
											break;
										}
									}
									break;
								}
							}
						}
					} 
					break;
				}
			}
		}
	});
};

dbHandler.prototype.modifyCategory = function (categoryID, categoryName, subtypeID, 
  subtypeName, itemID, itemName, callback) {
	var self = this;
	this.findOne({}, function (err, data) {
		if (err || !data || !data.category || !categoryID) {
			callback(err);
		} else {
			var categories = data.category;
			var newCategories = {};
			for (var categoryName2 in categories) {
				var category = categories[categoryName2];
				if (category.id != categoryID) {
					newCategories[categoryName2] = category;	
				} else {
					// Find changed category
					if (!subtypeID) {
						newCategories[categoryName] = category;	
					} else {
						var newCategory = {};
						for (var subtypeName2 in category) {
							if (subtypeName2 == 'id') {
								newCategory['id'] = category[subtypeName2];
							} else {
								var subtype = category[subtypeName2];
								if (subtype.id != subtypeID) {
									newCategory[subtypeName2] = subtype;
								} else {
									// Find changed subtype
									if (!itemID) {
										newCategory[subtypeName] = subtype;
									} else {
										var newSubtype = {};
										for (var itemName2 in subtype) {
											if (itemName2 == 'id') {
												newSubtype[itemName2] = subtype[itemName2];
											} else {
												var item = subtype[itemName2];
												if (item.id != itemID) {
													newSubtype[itemName2] = item;
												} else {
													newSubtype[itemName] = item;
												}
											}	
										}
										newCategory[subtypeName] = newSubtype;
									}
								}
							}
						}
						newCategories[categoryName] = newCategory;
					}
				}
			}
			self.update({}, {$set: {'category':newCategories}}, {}, callback);
		}

	});
}


dbHandler.prototype.addCategory = function (categoryID, categoryName, subtypeID, 
  subtypeName, itemID, itemName, callback) {
	var self = this;
	this.findOne({}, function (err, data) {
		if (err) {
			callback(err);
		} else {
			var categories = (data && data.category)? data.category : {};

			var subtype = {};
			var newCategory;
			var newSubtype;
			var newItem;

			newCategory = categories[categoryName];
			if (!newCategory) {
				newCategory = {'id': helper.uniqueID(categoryName)};
			}

			if (subtypeName) {
				newSubtype = newCategory[subtypeName];
				if (!newSubtype) {
					newSubtype = {'id': helper.uniqueID(subtypeName)};
					newCategory[subtypeName] = newSubtype;
				}
			}
			
			if (itemName) {
				newItem = newSubtype[itemName];
				if (!newItem) {
					newSubtype[itemName] = {'id': helper.uniqueID(itemName)};
				}
			}

			categories[categoryName] = newCategory;
			self.update({}, {$set: {'category':categories}}, {upsert:true}, callback);
		}
	});
};


dbHandler.prototype.deleteCategory = function (categoryName, subtypeName, 
											   itemName, callback) {
	var self = this;
	this.findOne({}, function (err, data) {
		if (err ||!data) {
			callback(err);
		} else {
			var categories = data.category;
console.log("1", categoryName);
console.log("2", subtypeName);
console.log("3", itemName);
console.log("Before", categories);
			if (!categoryName) {
				callback("Category name is NULL");
			} else {
				var category = categories[categoryName];
				if (subtypeName) {
					if (!category[subtypeName]) {
						return callback("No item");
					} else {
						var subtype = category[subtypeName];
						if (itemName) {
							if (!subtype[itemName]) {
								return callback("No item");
							} else {
								delete subtype[itemName];
							}
						} else {
							delete category[subtypeName];
						}
					}
				} else {
					delete categories[categoryName];
				}
console.log("After", categories);
				self.update({}, {$set:{'category':categories}}, {}, callback);
			}
		}
	});
};

dbHandler.prototype.updateQRCode = function (qrcode, callback) {
	this.update({}, {$set: {'qrcode':qrcode}}, {upsert:true}, callback);
};

dbHandler.prototype.getQRCode = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['qrcode']);
		}
	});
};

dbHandler.prototype.updateLogo = function (logo, callback) {
	this.update({}, {$set: {'logo':logo}}, {upsert:true}, callback);
};

dbHandler.prototype.getLogo = function (callback) {
	this.findOne({}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			callback(null, data['logo']);
		}
	});
};

dbHandler.prototype.addAdvertise = function(ad, callback) {
	var self = this;
	self.findOne({}, function (err, data) {
	 	if (err || !data) {
			callback(err);
		} else {
			var ads = data['advertise'];

			if (ads) {
				ads.push(ad);
			} else {
				ads = [ad];
			}
			self.update({}, {$set: {'advertise':ads}},
						{upsert:true}, callback);
		}
	});
};

dbHandler.prototype.getAdvertise = function (callback) {
    this.findOne({}, function (err, data) {
	 	if (err || !data) {
			callback(err);
		} else {
			callback(null, data['advertise']);
		}
	});
};

module.exports = new dbHandler();
