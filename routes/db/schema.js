'use strict';

var mongoose = require('mongoose');

module.exports = function(definition, collection) {
    var schema = new mongoose.Schema();
    schema.add(definition);
    schema.set('collection', collection);
    schema.set('minimize', false);
    schema.index({time:-1});
    return schema;
};
