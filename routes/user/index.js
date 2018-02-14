
'use strict';

var userRouter = require('./user.js');

var user = module.exports = {};

user.mount = function (express, router) {
     var myUserRouter = userRouter(express);
     router.use('/', myUserRouter);
};
