/**
*
* aliases.js - retrieves the application specific aliases or uses the defaults
*
**/

var defaults = require('../defaults/aliases.json');

module.exports = function (cwd) {
	var aliases;
	try {
		aliases = require(cwd + '/astro.json');
		return aliases;
	} catch (e) {
		return defaults;
	}
}

