
'use strict';

var myRouter = require('./router.js');

var interview = module.exports = {};

interview.mount = function (express, router) {
     var interviewRouter = myRouter(express);
     router.use('/interview', interviewRouter);
};
