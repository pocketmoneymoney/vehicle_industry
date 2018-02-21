
'use strict';

var myRouter = require('./router.js');
var dao = require('./dao.js');

var supplier = module.exports = {};

supplier.mount = function (express, router) {
     var supplierRouter = myRouter(express);
     router.use('/supplier', supplierRouter);
};

supplier.create = function (owner, id, person, company, callback) {
	dao.addSupplier(owner, id, person, company, callback);			
};

supplier.addProduct = function(id, productID, callback) {
	dao.addProduct(id, productID, callback);
};

supplier.deleteProduct = function(id, productID, callback) {
	dao.deleteProduct(id, productID, callback);
};

supplier.addEquipment = function(id, equipmentID, callback) {
	dao.addEquipment(id, equipmentID, callback);
};

supplier.deleteEquipment = function(id, equipmentID, callback) {
	dao.deleteEquipment(id, equipmentID, callback);
};

supplier.addCertification = function(id, certificationID, callback) {
	dao.addCertification(id, certificationID, callback);
};

supplier.deleteCertification = function(id, certificationID, callback) {
	dao.deleteCertification(id, certificationID, callback);
};
