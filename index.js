#! /usr/bin/env node
'use strict';
var help = require('./help');

var chokidar = require('chokidar');
var spawn = require('child_process').spawn,
		argv = process.argv,
		astroCmds = argv.splice(2),
		cwd = process.cwd();


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
						'mikefielden/astrokit:'+ imageName];

	if (astroCmd.indexOf('watch') !== -1) {

		chokidar.watch('.', {
			ignored: /[\/\\]\./,
			persistent: true}).on('change', function(path) {

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
		console.log('astro %s completed with code %s', command.astroCmd, code);
		if (cb) { console.log(cb) };  //TODO NEED TO STILL FIGURE THIS OUT
	});
};



// handle no command or help the same
if (astroCmds.length === 0 || astroCmds[0] === 'help' || astroCmds[0] === '-h') {
	help();
} else {
	// parse astroCmds
	// process the provided astro commands
	astroCmds.forEach(handleAstroCommand);
}


