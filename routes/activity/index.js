
'use strict';

var myRouter = require('./router.js');

var activity = module.exports = {};

activity.mount = function (express, router) {
     var activityRouter = myRouter(express);
     router.use('/activity', activityRouter);
};
