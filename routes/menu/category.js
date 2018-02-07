
'use strict';

module.exports = function(express) {

    var _ = require('underscore');
    var logger = require('log4js').getLogger('server');
    
    var dao = require('./dao.js');

    var router = express.Router({mergeParams: true});

    router.get('/', function (req, res) {
        var detail = req.query.detail? parseInt(req.query.detail) : 0;
        dao.getCategories(function(err, result) {
            var ret = [];
			if ((err) || (!result)) {
            	res.status(401).send("No category was found");
			} else {
            	ret = _.map(result, function (category) {
                	if (detail == 0) {
                    	return {
							'name': category['name'],
			    			'id': category['id'] };
                	} else {
                    	return {
                        	'name': category['name'],
		        			'id': category['id'],
                        	'item': 
                            	_.map(category['subtype'], function (subtype) {
				    				if (detail == 1) { 
				        				return { 
											'name': subtype['name'],
						 					'id': subtype['id']};
                    				} else { 
										return subtype;
				   	 				}
		            			})
						};
                 	};
            	});
            	res.send(JSON.stringify(ret));
			}
        });
    });


    router.get('/:id', function (req, res) {
        dao.getCategory(req.params.id, function(err, category) {
			if ((err) || (!category)) {
            	res.status(401).send("No category was found");
			} else {
            	var ret = _.map(category['subtype'], 
					function (subtype) {
                		return {
                    	    'name': subtype['name'],
				            'id': subtype['id'],
				            'item': _.map(subtype['item'], 
                                      function (item) {
                                          return { 'name': item['name'],
                                                   'id': item['id']};
					    	       })
                         	};
				});	
            	res.send(JSON.stringify(ret));
			}
        });
    });


    router.post('/', function (req, res) {
        var category = req.body['name'];
        if (category) {
            dao.addCategory(category, function(err) {
                if (err) {
                    res.status(422).send(err);
                } else {
                    res.status(201).send();
                }
	    });  
        } else {
            res.status(400).send("Invalid input category");
        }
    });

    router.put('/:id', function (req, res) {
        var name = req.body['newName'];
        if (name) {
            dao.modifyCategory(req.params.id, name, function (err) {
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
        dao.deleteCategory(req.params.id, function (err) {
            if (err) {
                res.status(503).send("Failed to remove category");
            } else {
				res.status(200).send();
	    	}
    	});
    });

    return router;
};
