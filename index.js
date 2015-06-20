#! /usr/bin/env node
'use strict';
var help = require('./src/messages/help');

var chokidar = require('chokidar')
	, chalk = require('chalk')
	, parseArgv = require('./src/parseArgv')
	, aliases = require('./src/aliases.js')
	, processCommands = require('./src/processCommands.js')
	, watcher = require('./src/watcher.js')
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


if (args.watch) {
	watcher(commands, args);
}

// process command
processCommands(commands, args);


// // process each astro command supplied
// // creating the docker run cmd
// function handleAstroCommand (astroCmd, cb) {
// 	var imageName = astroCmd.split(':')[0],
// 		command = 'docker',
// 		args = ['run',
// 						'-t',
// 						'--rm',
// 						'-v',
// 						'/' + cwd+':/src/app',
// 						'-e',
// 						'ASTROCMD='+ astroCmd,
// 						'mikefielden/astrokit:'+ imageName],
// 		options = astroCmd.split("-");

// 	// if babel:over is selected, then do special handling.
// 	if (astroCmd.indexOf('babel:over') !== -1) {

// 		args = ['run',
// 						'-t',
// 						'--rm',
// 						'-v',
// 						'/' + cwd+'/node_modules/' + options[1] + ':/src/app',
// 						'-e',
// 						'ASTROCMD='+ astroCmd,
// 						'mikefielden/astrokit:babeloverwrite'
// 						];

// 		// babel:over message
// 		console.log(chalk.red('IMPORTANT- babel:over only impacts a node_modules dependency'));
// 		console.log(chalk.red('         - It is for situations where a dependency require transpilation'));
// 		console.log(chalk.red('         - Typically for testing local dependency'));
// 	}


// 	if (astroCmd.indexOf('watch') !== -1) {


// 		chokidar.watch('.', {
// 			ignored: /[\/\\]\./,
// 			persistent: true}).on('change', function(path) {

// 			console.log(chalk.green('Astro saw change to: ' + path));

//   			runCommand({
//   				'astroCmd': astroCmd,
//   				'root': command,
//   				'args': args
//   			}, cb);
// 		});

// 	}

//   runCommand({
// 		'astroCmd': astroCmd,
// 		'root': command,
// 		'args': args
// 		}, cb);

// };

// // exec the docker run cmd and process output
// function runCommand (command, cb) {
// 	// set up
// 	var dockerRunCmd = spawn(command.root, command.args);

// 	dockerRunCmd.stdout.on('data', function (data) {
// 		console.log(data.toString());
// 	});

// 	dockerRunCmd.stderr.on('data', function (data) {
// 		console.log('stderr', data.toString());
// 	});

// 	dockerRunCmd.on('exit', function (code) {
// 		if (code === 0) {
// 			console.log(chalk.green('astro %s completed with code %s', command.astroCmd, code));
// 		} else {
// 			console.log(chalk.red('astro %s completed with code %s', command.astroCmd, code));
// 		}

// 		if (cb) { console.log(cb) };  //TODO NEED TO STILL FIGURE THIS OUT
// 	});
// };



// //parse aliases to command(s)
// // commands.forEach(function ()




// // handle no command or help the same
// // if (astroCmds.length === 0 || astroCmds[0] === 'help' || astroCmds[0] === '-h') {
// // 	help();
// // } else {
// // 	// parse astroCmds
// // 	// process the provided astro commands
// // 	astroCmds.forEach(handleAstroCommand);
// // }


