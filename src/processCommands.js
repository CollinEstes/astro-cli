/**
*
* processCommands.js - processes the user's astro command and options
*
* @param command - the astro command
* @param options - the options to apply to the command
**/

var noCommandFound = require('./messages/noCommandFound.js')
	, processCommandInContainer = require('./processCommandInContainer.js')
	, cwd = process.cwd()
	, executeCommand = require('./executeCommand.js')
	;

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
	var module, command;

	// check to see if command has --docker option
	if(options.docker) {
		// process command from inside application's Docker container image
		return processCommandInContainer(cmd, options);
	} else {
		 module = checkForModule(cmd);

		if (module) {
			command = require(module)(cwd, options);
			executeCommand(command.cmd, command.args, cwd);
		}
	}

};

module.exports = function (commands, options) {
	// process each command
	commands.forEach(function (cmd) {
		processCommand(cmd, options);
	});

};