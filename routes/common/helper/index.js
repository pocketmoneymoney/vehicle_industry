'use strict';

var crc = require('js-crc').crc32;

var helper = module.exports = {};

helper.uniqueID = function (name) {
    var ts = Date.parse(new Date());
    var random = parseInt(Math.random()*1000);
    if (name) {
        return ts.toString() + random.toString() + crc(name);
    } else {
        return ts.toString() + random.toString();
    }
};

