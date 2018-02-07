
'use strict';

var adminRouter = require('./router.js');

var user = module.exports = {};

user.mount = function (express, router) {
     var myAdminRouter = adminRouter(express);
     router.use('/admin', myAdminRouter);
};
