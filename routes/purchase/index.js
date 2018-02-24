
'use strict';

var myRouter = require('./router.js');
var dao = require('./dao.js');

var purchase = module.exports = {};

purchase.mount = function (express, router) {
     var purchaseRouter = myRouter(express);
     router.use('/purchase', purchaseRouter);
};
