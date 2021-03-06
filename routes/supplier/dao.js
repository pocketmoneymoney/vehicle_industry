
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');
var helper = require('../common/helper');
var userDB = require("../user/dao");

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, required:true },
		'owner':		{ type:String, required:true },

		'person':		{
			'myname':		String,
			'phone':		String,
			'email':		String,
		},

        'privilege':	{
			'verified': 	Boolean,
			'advertise': 	Boolean,
			'superior': 	Boolean,
		},

		'company': 		{
			'name':			String,
			'brief':		String,
			'product':		String,
			'customer':		String,
			'location':		String,
			'operator':		String,
			'assets':		String,
			'market':		String,
			'officalContact':		String,
			'officalPhone':			String,
			'officalEmail':			String,
			'link':					String,
			'address':				String,
			'createTime':	String
		},
		'product': 			{ type:Array, default:[] },
		'equipment': 		{ type:Array, default:[] },
		'certification':	{ type:Array, default:[] },
		'avatar':			String,
    	'poster':     String
	}, 'supplier', 'supplier');
}

dbHandler.prototype = Object.create(db.handler.prototype);
dbHandler.prototype.constructor = dbHandler;

dbHandler.prototype.addSupplier = function (owner, id, person, company, callback) {
	this.create({
		'id': id,
		'owner': owner,
		'person': {
			'myname': 		person['myname'],
			'phone': 		person['phone'],
			'email': 		person['email'],
		},
		'privilege': {
			'verified': 	false,
			'advertise': 	false,
			'superior': 	false,
		},
		'company': {
			'name':			company['name'],
			'product':		company['product'],
			'customer':		company['customer'],
		},
		'product': [],
		'equipment': [],
		'certification': []}, callback);
};

dbHandler.prototype.getSupplierList = function(page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.getSupplierAmount = function(callback) {
    this.count(callback);
};

dbHandler.prototype.getSupplierDetail = function (id, callback) {
    this.findOne({'id':id}, callback);
}

dbHandler.prototype.getPersonInfo = function (id, callback) {
    this.findOne({'id':id}, 'person', callback);
}

dbHandler.prototype.getCompanyInfo = function (id, callback) {
    this.findOne({'id':id}, 'company avatar', callback);
};

dbHandler.prototype.getRecommendedCompany = function(callback) {
	this.find({'privilege.superior': true}, function(err, data) {
		if (err || !data) {
			callback(null, []);
		} else {
			var result = [];
			for (var index = 0; index < data.length; index++) {
				var supplier = data[index];
				if (supplier.avatar) {
					result.push({'avatar': supplier.avatar,
								 'id': supplier.id,
								 'title': supplier.company.name});
				}
			}
			callback(null, result);
		}
	});
};

dbHandler.prototype.getPrevilegeInfo = function (page, num, callback) {
    db.daoTemplate.getPageItems.call(this, page, num, callback);
};

dbHandler.prototype.modifyPersonInfo = function (id, person, email, phone, callback) {
	var fields = {'person': {
		'myname': person,
		'email': email,
		'phone': phone}
	};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};
		
dbHandler.prototype.modifyPrivilegeInfo = function (id, verified, advertise, 
	superior, callback) {
	var params = {};

	if (verified) {
		params['verified'] = verified;
	}
	if (advertise) {
		params['advertise'] = advertise;
	}
	if (superior) {
		params['superior'] = superior;
	}
		
	var fields = {'privilege': params};
	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};


dbHandler.prototype.modifyCompanyInfo = function (
  id, owner, name, product, customer, brief, location, market, 
  officalContact, officalPhone, officalEmail, link, address,
  createTime, operator, assets, avatar, poster, callback) {
	var fields = {'company':
		{'name': name,
		 'product': product,
		 'customer': customer,
		 'brief': brief,
		 'location': location,
		 'market': market,
		 'officalContact': officalContact,
		 'officalPhone': officalPhone,
		 'officalEmail': officalEmail,
		 'link': link,
		 'address': address,
         'createTime': createTime,
         'operator': operator,
         'assets': assets,}};

	if (avatar) {
		fields['avatar'] = avatar;
	}

	if (poster) {
		fields['poster'] = poster;
	}

	if (id == 0) {
		id = helper.uniqueID(name);
		fields['owner'] = owner;
		fields['product'] = [];
		fields['equipment'] = [];
		fields['certification'] = [];
	}

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};

dbHandler.prototype.deleteSupplier = function (id, callback) {
	var self = this;
	userDB.deleteUser(id, function() {
    	self.remove({'id':id}, callback);
	});
};

dbHandler.prototype.addProduct = function (id, productID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			if (!data['product']) { data['product'] = []; }
			var duplicated = false;
            for (var i = 0; i < data['product'].length; i++) {
				if (data['product'][i] == productID) {
					duplicated = true;
					break;
				}
			}
			if (!duplicated) {
				data['product'].push(productID);
				self.update({'id':id}, {$set:{'product':data['product']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
};

dbHandler.prototype.deleteProduct = function (id, productID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var index = -1;
            for (var i = 0; i < data['product'].length; i++) {
				if (data['product'][i] == productID) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				data['product'].splice(index, 1);
				self.update({'id':id}, {$set:{'product':data['product']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
}

dbHandler.prototype.addEquipment = function (id, equipmentID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			if (!data['equipment']) { data['equipment'] = []; }
			var duplicated = false;
            for (var i = 0; i < data['equipment'].length; i++) {
				if (data['equipment'][i] == equipmentID) {
					duplicated = true;
					break;
				}
			}
			if (!duplicated) {
				data['equipment'].push(equipmentID);
				self.update({'id':id}, {$set:{'equipment':data['equipment']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
};

dbHandler.prototype.deleteEquipment = function (id, equipmentID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var index = -1;
            for (var i = 0; i < data['equipment'].length; i++) {
				if (data['equipment'][i] == equipmentID) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				data['equipment'].splice(index, 1);
				self.update({'id':id}, {$set:{'equipment':data['equipment']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
}

dbHandler.prototype.addCertification = function (id, certificationID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			if (!data['certification']) { data['certification'] = []; }
			var duplicated = false;
            for (var i = 0; i < data['certification'].length; i++) {
				if (data['certification'][i] == certificationID) {
					duplicated = true;
					break;
				}
			}
			if (!duplicated) {
				data['certification'].push(certificationID);
				self.update({'id':id}, {$set:{'certification':data['certification']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
};

dbHandler.prototype.deleteCertification = function (id, certificationID, callback) {
	var self = this;
	this.findOne({'id':id}, function (err, data) {
		if (err || !data) {
			callback(err);
		} else {
			var index = -1;
            for (var i = 0; i < data['certification'].length; i++) {
				if (data['certification'][i] == certificationID) {
					index = i;
					break;
				}
			}
			if (index >= 0) {
				data['certification'].splice(index, 1);
				self.update({'id':id}, {$set:{'certification':data['certification']}}, {}, callback);
			} else {
				callback(null);
			}
		}
	});
}

dbHandler.prototype.deleteAvatar = function (id, callback) {
	this.update({'id':id}, {$set:{'avatar':''}}, {}, callback);
};

dbHandler.prototype.search = function (name, page, num, callback) {
	var self = this;
	var result = [];

	var priority0 = [];
	var priority1 = [];
	var priority2 = [];
	var priority3 = [];
	var priority4 = [];
	var condition = {};
	if (name) {
		var nameList = name.split(' ');
		var conditionItems = [];
		for (var index = 0; index < nameList.length; index++) {
			var reg = new RegExp(nameList[index], 'i');
			conditionItems.push({'company.name': {$regex: reg}});
			conditionItems.push({'company.product': {$regex: reg}});
			conditionItems.push({'company.brief': {$regex: reg}});
		}
		condition = {'$or':conditionItems};
	}

	self.model
	.find(condition, null, {sort: {_id: -1}})
	.limit(300)
	.sort({'id':-1})
	.exec(function(err, data) {
		if (err || !data) {
			callback(err, []);
		} else {
			var names = [];
			if (!name) {
				name = '';
			} else {
				names = name.split(' ');
			}

			for (var index = 0; index < data.length; index++) {
				var supplier = data[index];
				if (supplier.privilege.verified) {
					priority0.push(supplier);
				} else if (supplier.company && supplier.company.name &&
					_isNameMatched(names, supplier.company.name)) {
					priority1.push(supplier);
				} else if (supplier.company.product && supplier.company.product &&
							_isNameMatched(names, supplier.product.name)) {
					priority2.push(supplier);
				} else if (supplier.company.brief && supplier.company.brief &&
							_isNameMatched(names, supplier.company.brief.name)) {
					priority3.push(supplier);
				} else {
					priority4.push(supplier);
				}
			}
			result = result.concat(priority0).concat(priority1).concat(priority2).
						    concat(priority3).concat(priority4);
			var resultAmount = result.length;
			var currentPageResult = result.slice(page, page + num);
			callback(null, {'data':currentPageResult, 'amount':resultAmount});
		}
	});
};

function _isNameMatched(names, strval) {
	if (!strval) {
		return false;
	}

	for (var index = 0; index < names.length; index++) {
		if (strval.search(names[index]) >= 0) {
			return true;
		}
	}
	return false;
}

module.exports = new dbHandler();
