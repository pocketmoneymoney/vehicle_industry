
'use strict';

var myRouter = require('./router.js');

var supplier = module.exports = {};

supplier.mount = function (express, router) {
     var supplierRouter = myRouter(express);
     router.use('/supplier', supplierRouter);
};
