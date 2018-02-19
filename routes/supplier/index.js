
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
