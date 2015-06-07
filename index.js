#! /usr/bin/env node
var spawn = require('child_process').spawn,
		argv = process.argv,
		astroCmd = argv[2],
		astroArgs = argv.splice
		cwd = process.cwd(),
		command = 'docker',
		args = ['run',
						'-t',
						'-v',
						cwd+':/src/app'];


// handle additional arguments
if (astroArgs.length !== 0) {
	// THIS IS WHERE WE WOULD ADD ADDITIONAL ARGUEMENTS TO ARGS
}


// check for 'watch' command
if (astroCmd === 'watch') {
	// default for watch is mocha
	args.push('mikefielden/astrokit:mocha');
	watch(command, args);
} else {

	// add selected image to args
	args.push('mikefielden/astrokit:'+ astroCmd);
	runCommand(command, args);
}


function runCommand (command, args) {
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



function watch (command, args) {
	var watch = require('watch');

	watch.watchTree(cwd, function (f, curr, prev) {
		console.log('WATCH FOUND');
    runCommand(command, args);
  });

}