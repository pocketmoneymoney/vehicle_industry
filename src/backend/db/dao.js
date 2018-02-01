'use strict';

var mongoose = require('mongoose');

var template = module.exports = {};

template.getPageItems = function (handler, page, num, callback) {
    var total = (page + 1) * num;
    handler.findMultiple(total, function (err, data) {
        if (err) {
           callback("Failed to get any data from database", []);
        } else {
           var items = data.slice(page, page + num);
           callback(err, items);
        }
    });
};
