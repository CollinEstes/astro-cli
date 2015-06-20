/**
*
* processCommands.js - processes the user's astro command and options
*
* @param command - the astro command
* @param options - the options to apply to the command
**/

var noCommandFound = require('./messages/noCommandFound.js');
var cwd = process.cwd();

var processOutput = require('./processOutput.js');

// check to see if module requested exists
function checkForModule (cmd) {
	var moduleName = "astro-" + cmd,
		foundName;
	try {
		foundName = require.resolve(moduleName);
		return foundName;
	}
	catch (e) {
		noCommandFound(cmd);
		foundName = null;
		return foundName;
	}
}

// process the command
function processCommand (cmd, options) {
	var module = checkForModule(cmd),
		command;

	if (module) {
		command = require(module)(cwd, options);
		processOutput(command.cmd, command.args);
	}

};

module.exports = function (commands, options) {
	// process each command
	commands.forEach(function (cmd) {
		processCommand(cmd, options);
	});

};