
'use strict';

var myRouter = require('./router.js');

var admin = module.exports = {};

admin.mount = function (express, router) {
     var adminRouter = myRouter(express);
     router.use('/admin', function (req, res, next) {
         if (req.user) {
            next();
         } else {
             res.status(401).end();
         }
     }, adminRouter);
};
