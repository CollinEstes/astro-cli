#! /usr/bin/env node
'use strict';
var help = require('./help');

var chokidar = require('chokidar')
	, chalk = require('chalk')
	, parseArgv = require('minimist')
	;

var spawn = require('child_process').spawn
	, argv = parseArgv(process.argv)
	, commands = argv._.slice(2)
	, options
	, cwd = process.cwd()
	;


// process each astro command supplied
// creating the docker run cmd
function handleAstroCommand (astroCmd, cb) {
	var imageName = astroCmd.split(':')[0],
		command = 'docker',
		args = ['run',
						'-t',
						'--rm',
						'-v',
						'/' + cwd+':/src/app',
						'-e',
						'ASTROCMD='+ astroCmd,
						'mikefielden/astrokit:'+ imageName],
		options = astroCmd.split("-");

	// if babel:over is selected, then do special handling.
	if (astroCmd.indexOf('babel:over') !== -1) {

		args = ['run',
						'-t',
						'--rm',
						'-v',
						'/' + cwd+'/node_modules/' + options[1] + ':/src/app',
						'-e',
						'ASTROCMD='+ astroCmd,
						'mikefielden/astrokit:babeloverwrite'
						];

		// babel:over message
		console.log(chalk.red('IMPORTANT- babel:over only impacts a node_modules dependency'));
		console.log(chalk.red('         - It is for situations where a dependency require transpilation'));
		console.log(chalk.red('         - Typically for testing local dependency'));
	}


	if (astroCmd.indexOf('watch') !== -1) {


		chokidar.watch('.', {
			ignored: /[\/\\]\./,
			persistent: true}).on('change', function(path) {

			console.log(chalk.green('Astro saw change to: ' + path));

  			runCommand({
  				'astroCmd': astroCmd,
  				'root': command,
  				'args': args
  			}, cb);
		});

	}

  runCommand({
		'astroCmd': astroCmd,
		'root': command,
		'args': args
		}, cb);

};

// exec the docker run cmd and process output
function runCommand (command, cb) {
	// set up
	var dockerRunCmd = spawn(command.root, command.args);

	dockerRunCmd.stdout.on('data', function (data) {
		console.log(data.toString());
	});

	dockerRunCmd.stderr.on('data', function (data) {
		console.log('stderr', data.toString());
	});

	dockerRunCmd.on('exit', function (code) {
		if (code === 0) {
			console.log(chalk.green('astro %s completed with code %s', command.astroCmd, code));
		} else {
			console.log(chalk.red('astro %s completed with code %s', command.astroCmd, code));
		}

		if (cb) { console.log(cb) };  //TODO NEED TO STILL FIGURE THIS OUT
	});
};



console.log(argv);

// handle no command or help the same
// if (astroCmds.length === 0 || astroCmds[0] === 'help' || astroCmds[0] === '-h') {
// 	help();
// } else {
// 	// parse astroCmds
// 	// process the provided astro commands
// 	astroCmds.forEach(handleAstroCommand);
// }


