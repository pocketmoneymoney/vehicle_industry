
'use strict';

var myRouter = require('./router.js');

var meeting = module.exports = {};

meeting.mount = function (express, router) {
     var meetingRouter = myRouter(express);
     router.use('/meeting', meetingRouter);
};
