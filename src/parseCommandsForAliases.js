/**
*
* parseCommands.js - searching for aliases in supplied commands
*
* @param - commands - the array of string commands to be parsed
* @param - aliases - the object containing aliases keys
**/
var _ = require('lodash');

module.exports = function (commands, aliases) {
	var parsed = [];
	if (!commands || commands.length === 0) {
		return parsed;
	}

	if (!aliases) {
		return commands;
	}

	commands.forEach(function (cmd) {
		// if there is an alias then bring in aliases' commands
		if (aliases[cmd]) {
			parsed.concat(aliases[cmd]);
		} else
		{
			parsed.push(cmd);
		}
	});

	console.log(parsed);

	return _.uniq(parsed);
}
