'use strict';

var mongoose = require('mongoose');

var template = module.exports = {};

template.getPageItems = function (page, num, callback, conditions) {
    var total = (page + 1) * num;
	if (conditions === undefined) {
		conditions = {}
	}
    this.findMultiple(conditions, total, function (err, data) {
        if (err) {
           callback("Failed to get any data from database", []);
        } else {
           var items = data.slice(page, page + num);
           callback(err, items);
        }
    });
};
