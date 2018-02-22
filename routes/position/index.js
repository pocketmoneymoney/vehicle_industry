
'use strict';

var myRouter = require('./router.js');
var dao = require('./dao.js');

var position = module.exports = {};

position.mount = function (express, router) {
     var positionRouter = myRouter(express);
     router.use('/position', positionRouter);
};
