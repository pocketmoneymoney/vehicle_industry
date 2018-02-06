
'use strict';

var dao = require('./dao.js');
var CategoryRouter = require('./category.js');
var SubtypeRouter = require('./subtype.js');

var category = module.exports = {};

category.all = function (callback) {
    dao.getCategories(callback);
};

category.mount = function (express, router) {
     var categoryRouter = CategoryRouter(express);
     router.use('/menu/category', categoryRouter);

     var subtypeRouter = SubtypeRouter(express);
     router.use('/menu/subtype', subtypeRouter);
}
