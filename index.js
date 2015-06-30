#! /usr/bin/env node
/**
*
* astro-cli - Entrypoint for Astro CLI commands
*
**/

'use strict';
var help = require('./src/messages/help');

var chokidar = require('chokidar')
	, chalk = require('chalk')
	, parseArgv = require('./src/parseArgv')
	, aliases = require('./src/aliases')()
	, processCommands = require('./src/processCommands')
	, processCommandsInContainer = require('./src/processCommandsInContainer')
	, processInstallCommands = require('./src/processInstallCommands')
	, processAliasCommands = require('./src/processAliasCommands')
	, watcher = require('./src/watcher')
	;

// parse Argv
var argv = parseArgv(process.argv, aliases)
	, commands = argv._
	, commandString = commands.join('')
	, args = argv
	, firstCommand = commands[0];


// remove commands from arguments;
delete args._;

// flag for help
var needsHelp = commands.length === 0 || commandString.indexOf('help') !== -1
if (needsHelp) {
	return help();
}

// check for update/install command
// special function for installing/updateing astro modules for usage
if (firstCommand === 'install' || firstCommand === 'update') {
	return processInstallCommands(commands, args);
}

if (firstCommand === 'alias' || firstCommand === 'aliases') {
	return processAliasCommands(commands, args);
}

// handle watch request option
if (args.watch) {
	watcher(commands, args);
}


// check for docker option
if (args.docker) {
	// process commands from within the application's docker container
	processCommandsInContainer(commands, args);
} else {
	// process commands locally
	processCommands(commands, args);
}
