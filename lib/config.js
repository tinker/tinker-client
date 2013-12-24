'use strict';

var fs = require('fs'),
	path = require('path'),
	mixIn = require('mout/object/mixIn');

var config = {};

/**
 * Load config from file
 * @param {String} file
 */
config.load = function(file){
	file = path.normalize(file);
	if (!fs.existsSync(file)){
		return;
	}

	var json = fs.readFileSync(file, {encoding: 'utf8'});
	if (!json){
		return;
	}

	json = JSON.parse(json);
	mixIn(config, json);
	return true;
};

module.exports = config;

