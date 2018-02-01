
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');

    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

    router.get('/overview', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
         var start = (page - 1) * num;
         dao.getPurchaseOrders(start, num, function (err, result) {
             res.send(JSON.stringify(result));
         });
    });

    router.get('/amount', function (req, res) {
        dao.getPurchaseOrdersAmount(function (err, result) {
            res.send(JSON.stringify(result));
	});
    });

    return router;
};
