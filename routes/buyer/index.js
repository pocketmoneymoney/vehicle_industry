
'use strict';

var myRouter = require('./router.js');
var dao = require('./dao.js');

var buyer = module.exports = {};

buyer.mount = function (express, router) {
     var buyerRouter = myRouter(express);
     router.use('/buyer', buyerRouter);
};

buyer.create = function (owner, id, person, company, email, callback) {
	dao.addBuyer(owner, id, person, company, email, callback);			
};
