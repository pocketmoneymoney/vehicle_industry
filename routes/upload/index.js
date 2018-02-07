
'use strict';

var uploadRouter = require('./router.js');

var user = module.exports = {};

user.mount = function (express, router) {
     var myRouter = uploadRouter(express);
     router.use('/upload', myRouter);
};
