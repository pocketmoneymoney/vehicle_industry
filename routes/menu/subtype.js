
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
    
    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

    router.get('/:categoryID/:subtypeID', function (req, res) {
		dao.getSubtype(req.params.subtypeID, function (err, result) {
            res.send(JSON.stringify(result));
        });
    });


	router.post('/:categoryID', function (req, res) {
		var categoryID = req.params.categoryID;
		var subtype = req.body['subtype'];
		var items = req.body['items'] ? req.body['items'] : [];
		if (subtype) {
			dao.addSubtype(categoryID, subtype, items, function (err) {
				if (err) {
					res.status(422).send(err);
				} else {
					res.status(201).send();
				}
			});
		}
	});


    router.put('/:categoryID/:subtypeID', function (req, res) {
		var categoryID = req.params.categoryID;
		var subtypeID = req.params.subtypeID;
		var subtypeName = req.body['subtype'];
		var items = req.body['items'] ? req.body['items'] : [];

		if (subtypeName) {
            dao.modifySubtype(categoryID, subtypeName, subtypeID, items, function (err) {
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

    router.delete('/:categoryID/:subtypeID', function (req, res) {
		var categoryID = req.params.categoryID;
		var subtypeID = req.params.subtypeID;
        dao.deleteSubtype(categoryID, subtypeID, function (err) {
            if (err) {
                res.status(503).send("Failed to remove category");
            } else {
				res.status(200).send();
	    	}
    	});
    });

    return router;
};
