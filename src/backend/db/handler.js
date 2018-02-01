'use strict';

var fs = require('fs');
var path = require('path');
var log4js = require('log4js');
var mongoose = require('mongoose');
var baseSchema = require('./schema');
var logger = log4js.getLogger('server');

function DBHandler(definition, collection, model) {
    this.collection = collection;
    this.schema = baseSchema(definition, collection);
    this.model = mongoose.model(model, this.schema);
    this.schema.index({time:-1});
}

DBHandler.prototype.getSchema = function() {
    return this.schema;
};

DBHandler.prototype.find = function(conditions, projection, options, callback) {
    this.model.find(conditions, projection, options, callback);
};

DBHandler.prototype.findOne = function(conditions, projection, options, callback) {
    if (typeof conditions === 'function') {
        callback = conditions;
        conditions = {};
        projection = null;
        options = null;
      } else if (typeof projection === 'function') {
        callback = projection;
        projection = null;
        options = null;
      } else if (typeof options === 'function') {
        callback = options;
        options = null;
      }

    var query = this.model
        .find(conditions, projection, options)
        .limit(1);
    query.exec(function(err, data) {
        callback(err, data && data[0]);
    });
};

DBHandler.prototype.findMultiple = function(conditions, projection, options, 
				            limit, callback) {
    if (typeof projection === 'function') {
        callback = projection;
        limit = conditions;
        conditions = {};
        projection = null;
        options = null;
      } else if (typeof options === 'function') {
        callback = options;
        limit = projection;
        projection = null;
        options = null;
      } else if (typeof limit === 'function') {
        callback = limit;
        limit = options;
        options = null;
      }

    var query = this.model
        .find(conditions, projection, options)
        .limit(limit);
    query.exec(function(err, data) {
        callback(err, data);
    });
}

DBHandler.prototype.getGroup = function(filter, group, callback) {
    this.model
    .aggregate()
    .match(filter)
    .group(group)
    .exec(callback);
};

DBHandler.prototype.create = function(fields, callback) {
    this.model
    .create(fields, callback);
};

DBHandler.prototype.update = function(filter, fields, options, callback) {
    this.model
    .update(filter, fields, options, callback);
};

DBHandler.prototype.remove = function(filter, callback) {
    this.model
    .remove(filter, callback);
};

DBHandler.prototype.count = function(filter, callback) {
    this.model
    .count(filter, callback);
};

module.exports = DBHandler;
