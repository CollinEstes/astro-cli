/**
*
* parseArgv.js - searching for aliases in supplied commands
*
* @param - commands - the array of string commands to be parsed
* @param - aliases - the object containing aliases keys
**/
var _ = require('lodash');
var minimist = require('minimist');

module.exports = function (argv, aliases) {
	var parsed = minimist(argv.slice(2))
		commands = parsed._;

	if (!aliases) {
		return parsed;
	}

	// if there is an alias then override argv
	if (aliases[parsed._[0]]) {
		parsed = minimist(aliases[parsed._[0]]);
	}

	return parsed;
}
