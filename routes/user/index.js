
'use strict';

var adminRouter = require('./admin.js');

var user = module.exports = {};

user.mount = function (express, router) {
     var myAdminRouter = adminRouter(express);
     router.use('/', myAdminRouter);
};
