
'use strict';

var mongoose = require('mongoose');
var db = require('../common/db');

function dbHandler() {
     db.handler.call(this, {
		'id':			{ type:String, unique:true, required:true },
		'owner':		{ type:String, unique:true, required:true },

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
			'createTime':	String
		},
		'product': 			{ type:Array, default:[] },
		'equipment': 		{ type:Array, default:[] },
		'certification':	{ type:Array, default:{} },
		'avatar':			String
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
	var fields = {'privilege': {
		'verified': verified,
		'advertise': advertise,
		'superior': superior}
	};

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};


dbHandler.prototype.modifyCompanyInfo = function (id, name, product, customer, 
	brief, location, market, createTime, operator, assets, avatar, callback) {
	var fields = {'company':
		{'name': name,
		 'product': product,
		 'customer': customer,
		 'brief': brief,
		 'location': location,
		 'market': market,
         'createTime': createTime,
         'operator': operator,
         'assets': assets,}};

	if (avatar) {
		fields['avatar'] = avatar;
	}

	this.update({'id':id}, {$set: fields}, {upsert:true}, callback);
};

dbHandler.prototype.deleteSupplier = function (id, callback) {
    this.remove({'id':id}, callback);
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

	var priority1 = [];
	var priority2 = [];
	var priority3 = [];
	
	var condition = {};
	if (name) {
		var reg = new RegExp(name, 'i');
		condition = {'$or':[{'company.name': {$regex: reg}}, 
				  			{'company.brief': {$regex: reg}},
				  			{'company.product': {$regex: reg}}]};
	}

	self.model
	.find(condition, null, {sort: {_id: -1}})
	.limit(1000)
	.sort({'id':-1})
	.exec(function(err, data) {
		if (err || !data) {
			callback(err, []);
		} else {
			for (var index = 0; index < data.length; index++) {
				var supplier = data[index];
				if (supplier.company && supplier.company.name &&
			    	supplier.company.name.search(name) >= 0) {
					priority1.push(supplier);
				} else if (supplier.company.product && supplier.company.product &&
					   	   supplier.company.product.search(name) >= 0) {
					priority2.push(supplier);
				} else if (supplier.company.brief && supplier.company.brief &&
					   	   supplier.company.brief.search(name) >= 0) {
					priority2.push(supplier);
				} 
			}
			result = result.concat(priority1).concat(priority2).concat(priority3);
			var resultAmount = result.length;
			var currentPageResult = result.slice(page, page + num);
			callback(null, {'data':currentPageResult, 'amount':resultAmount});
		}
	});
};

module.exports = new dbHandler();
