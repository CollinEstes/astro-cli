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
	, firstCommand = commands[0]
	, isNeedsHelp = commands.length === 0 || commandString.indexOf('help') !== -1
	,	isInstallOrUpdate = firstCommand === 'install' || firstCommand === 'update'
	, isAliasCommand = firstCommand === 'alias' || firstCommand === 'aliases'
	;

// remove commands from arguments;
delete args._;

if (isNeedsHelp) {
	help();
} else if (isInstallOrUpdate) {
	processInstallCommands(commands, args);
} else if (isAliasCommand) {
	processAliasCommands(commands, args);
} else {
	if (args.watch) {
		watcher(commands, args);
	} else {
    // check for docker option
    if (args.docker) {
      // process commands from within the application's docker container
      processCommandsInContainer(commands, args);
    } else {
      // process commands locally
      processCommands(commands, args);
    }
  }
}
