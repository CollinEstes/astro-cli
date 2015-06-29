#! /usr/bin/env node
'use strict';
var help = require('./src/messages/help');

var chokidar = require('chokidar')
	, chalk = require('chalk')
	, parseArgv = require('./src/parseArgv')
	, aliases = require('./src/aliases')()
	, processCommands = require('./src/processCommands')
	, processCommandsInContainer = require('./src/processCommandsInContainer')
	, processInstallCommands = require('./src/processInstallCommands')
	, watcher = require('./src/watcher')
	;

// parse Argv
var argv = parseArgv(process.argv, aliases)
	, commands = argv._
	, commandString = commands.join('')
	, args = argv;


// remove commands from arguments;
delete args._;

// flag for help
var needsHelp = commands.length === 0 || commandString.indexOf('help') !== -1
if (needsHelp) {
	return help();
}

// check for update/install command
// special function for installing/updateing astro modules for usage
if (commands[0] === 'install' || commands[0] === 'update') {
	return processInstallCommands(commands, args);
}

// handle watch request option
if (args.watch) {
	watcher(commands, args);
}

// check for docker option
if (args.docker) {
	processCommandsInContainer(commands, args);
} else {
	processCommands(commands, args);
}
