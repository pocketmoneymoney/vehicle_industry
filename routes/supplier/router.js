
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
	var multer = require('multer');
	var path = require('path');

    var dao = require('./dao.js');

	var storage = multer.diskStorage({
  		destination: function (req, file, cb) {
    		cb(null, './public/supplier')
  		},
  		filename: function (req, file, cb) {
    		cb(null, file.fieldname + '-' + Date.now())
  		}
	});

	var upload = multer({ storage: storage })
    var router = express.Router({mergeParams: true});

    router.get('/overview', function (req, res) {
         var page = req.query.page? parseInt(req.query.page) : 1;
         var num = req.query.num? parseInt(req.query.num) : 1;
         var start = page * num;
         dao.getSupplierList(start, num, function (err, result) {
             res.send(JSON.stringify(result));
         });
    });

    router.get('/amount', function (req, res) {
        dao.getSupplierAmount(function (err, result) {
            res.send(JSON.stringify(result));
		});
    });

    router.get('/:id', function (req, res) {
         dao.getSupplierDetail(req.params.id, function (err, result) {
            res.send("Detail View:" + JSON.stringify(result));
         });
    });


	router.post('/', upload.fields([
			{name:'avatar', maxCount:1}, 
			{name: 'certification', maxCount:10}]), function (req, res, next) {
		var name 		= req.body.name;
		var brief 		= req.body.brief;
		var location 	= req.body.location;
		var customer 	= req.body.customer;
		var market 		= req.body.market;
		var product 	= req.body.product;

		var owner 		= req.user;
		
		var avatarPath = null;
		if (req.files['avatar'] && req.files['avatar'][0]) {
			avatarPath = path.join(req.files['avatar'][0].destination, 
								   req.files['avatar'][0].filename);
		}
		
		var certificationPath = null;
		if (req.files['certification']) {
			certificationPath = _.map(req.files['certification'], function(ca) {
				return path.join(ca.destination, ca.filename);
			});
		}

		dao.addSupplier(name, brief, location, customer, market, product, owner,
			avatarPath, certificationPath, function (err) {
			if (err) {
				res.status(401).send("Failed to add supplier to database");
			} else {
				res.status(201).send();
			}
		});
	});

	router.put('/:id', upload.fields([
			{name:'avatar', maxCount:1}, 
			{name: 'certification', maxCount:10}]), function (req, res, next) {
		var name 		= req.body.name;
		var brief 		= req.body.brief;
		var location 	= req.body.location;
		var customer 	= req.body.customer;
		var market 		= req.body.market;
		var product 	= req.body.product;
		var id			= req.params.id;

		var owner 		= req.user;
		
		var avatarPath = null;
		if (req.files['avatar'] && req.files['avatar'][0]) {
			avatarPath = path.join(req.files['avatar'][0].destination, 
								   req.files['avatar'][0].filename);
		}
		
		var certificationPath = null;
		if (req.files['certification']) {
			certificationPath = _.map(req.files['certification'], function(ca) {
				return path.join(ca.destination, ca.filename);
			});
		}

		dao.modifySupplier(id, name, brief, location, customer, market, product, owner,
			avatarPath, certificationPath, function (err) {
			if (err) {
				res.status(401).send("Failed to add supplier to database");
			} else {
				res.status(201).send();
			}
		});
	});

	router.delete('/:id', function (req, res) {
		dao.deleteSupplier(req.params.id, function (err) {
            if (err) {
                res.status(503).send("Failed to remove category");
            } else {
				res.status(200).send();
	    	}
		});	
	});

    return router;
};
