
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
    
    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

    router.get('/:id', function (req, res) {
		dao.getSubtype(req.params.id, function (err, result) {
            res.send(JSON.stringify(result));
        });
    });


	router.post('/', function (req, res) {
		var categoryID = req.body['categoryID'];
		var subtype = req.body['subtype'];
		var items = req.body['items'] ? req.body['items'] : [];
		if (categoryID && subtype) {
			dao.addSubtype(categoryID, subtype, items, function (err) {
				if (err) {
					res.status(422).send(err);
				} else {
					res.status(201).send();
				}
			});
		}
	});


    router.put('/:id', function (req, res) {
		var categoryID = req.body['categoryID'];
		var subtypeName = req.body['subtype'];
		var items = req.body['items'] ? req.body['items'] : [];

		if (categoryID && subtypeName) {
            dao.modifySubtype(categoryID, subtypeName, req.params.id, items, function (err) {
                if (err) {
                    res.status(503).send("Failed to modify category");
                } else {
		    res.status(200).send();
		}
            });
        } else {
            res.status(400).send("no data to modify");
		}
    });

    router.delete('/:id', function (req, res) {
		var categoryID = req.body['categoryID'];
        dao.deleteSubtype(categoryID, req.params.id, function (err) {
            if (err) {
                res.status(503).send("Failed to remove category");
            } else {
				res.status(200).send();
	    	}
    	});
    });

    return router;
};
