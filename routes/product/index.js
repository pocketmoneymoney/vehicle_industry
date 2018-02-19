
'use strict';

var myRouter = require('./router.js');

var product = module.exports = {};

product.mount = function (express, router) {
     var productRouter = myRouter(express);
     router.use('/product', productRouter);
};
