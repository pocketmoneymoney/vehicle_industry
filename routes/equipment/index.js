
'use strict';

var myRouter = require('./router.js');

var equipment = module.exports = {};

equipment.mount = function (express, router) {
     var equipmentRouter = myRouter(express);
     router.use('/equipment', equipmentRouter);
};
