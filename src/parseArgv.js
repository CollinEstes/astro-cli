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
	var parsedArgv = minimist(argv.slice(2))
		, commands = parsedArgv._
		, parsed;

	if (!aliases || !aliases[parsedArgv._[0]] || parsedArgv.docker) {
		return parsedArgv;
	}

	// bring in alias commands
	parsed = minimist(aliases[parsedArgv._[0]]);

	if (parsedArgv.docker) {
		parsed.docker = true;
	}

	// if watch add option back
	if (parsedArgv.watch) {
		parsed.watch = true;
	}

	return parsed;
}
