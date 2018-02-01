
'use strict';

var myRouter = require('./router.js');

var factory = module.exports = {};

purchase.mount = function (express, router) {
     var factoryRouter = myRouter(express);
     router.use('/factory', factoryRouter);
};
