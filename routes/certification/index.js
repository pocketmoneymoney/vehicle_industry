
'use strict';

var myRouter = require('./router.js');

var certification = module.exports = {};

certification.mount = function (express, router) {
     var certificationRouter = myRouter(express);
     router.use('/certification', certificationRouter);
};
