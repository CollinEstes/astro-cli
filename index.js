#! /usr/bin/env node
'use strict';
var  _ = require('lodash');

var spawn = require('child_process').spawn,
		argv = process.argv,
		astroCmds = argv.splice(2),
		cwd = process.cwd();


// process each astro command supplied
// creating the docker run cmd
function handleAstroCommands (astroCmd) {
	var imageName = astroCmd.split(':')[0],
		command = 'docker',
		args = ['run',
						'-t',
						'-v',
						cwd+':/src/app',
						'-e',
						'ASTROCMD='+ astroCmd,
						'mikefielden/astrokit:'+ imageName];

	runCommand(astroCmd, command,args);
};

// exec the docker run cmd and process output
function runCommand (astroCmd, command, args) {
	// set up
	var dockerRunCmd = spawn(command, args);

	dockerRunCmd.stdout.on('data', function (data) {
		console.log(data.toString());
	});

	dockerRunCmd.stderr.on('data', function (data) {
		console.log('stderr', data.toString());
	});

	dockerRunCmd.on('exit', function (code) {
		console.log('astro %s completed with code %s', astroCmd, code);
	});
};

// display astro help
function help () {
	console.log('TODO:  ADD HELP HERE');
}


// handle no command or help the same
if (astroCmds.length === 0 || astroCmds[0] === 'help') {
	help();
} else {
	// process the provided astro commands
	_.forEach(astroCmds, handleAstroCommands);
}


