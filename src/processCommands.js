/**
*
* processCommands.js - processes the user's astro command and options
*
* @param command - the astro command
* @param options - the options to apply to the command
**/

var noCommandFound = require('./messages/noCommandFound.js');

module.exports = function (aliases, command, options) {
	// check for alias
	if (aliases[command]) {
		command = aliases[command];
	}

	//check and see if there is a corresponding file for the command
	try {
		var commandFile = require('./commands/' + command + '.js');
		commandFile(options);
	} catch (e) {
		// show unknown command message;
		noCommandFound(command);
	}
}
