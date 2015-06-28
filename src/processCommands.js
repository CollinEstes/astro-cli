/**
*
* processCommands.js - processes the user's astro command and options
*
* @param command - the astro command
* @param options - the options to apply to the command
**/

var noCommandFound = require('./messages/noCommandFound')
	, processInstallCommands = require('./processInstallCommands')
	, processCommandInContainer = require('./processCommandInContainer')
	, cwd = process.cwd()
	, executeCommand = require('./executeCommand')
	, checkForModule = require('./checkForModule')
	;

// execute
function executeModule(module, options) {
	var command = require(module)(cwd, options);

	// if the module returns a command execute it
	if (command.cmd) {
		return executeCommand(command.cmd, command.args, cwd);
	}

	return;
}

// process the command
function processCommand (cmd, options) {
	var module;

	// check to see if command has --docker option
	if(options.docker) {
		// process command from inside application's Docker container image
		return processCommandInContainer(cmd, options);
	} else {
		 module = checkForModule(cmd);

		 // execute module if exists
		if (module) {
			return executeModule(module, options);
		}

		// if module doesn't exist and option "force" then install before running
		if (options.force) {
			return processInstallCommands(['install', cmd], options, function () {
				module = checkForModule(cmd);

		 		// execute module if exists now
				if (module) {
					executeModule(module, options);
				} else{
					noCommandFound(cmd);
				}

			});
		}

		// module was not found and "force" was not desginated
		return noCommandFound(cmd);

	}

};


module.exports = function (commands, options) {
	// process each command
	commands.forEach(function (cmd) {
		processCommand(cmd, options);
	});

};