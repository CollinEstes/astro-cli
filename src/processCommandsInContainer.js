/**
*
* processCommandInContianer.js - setups up docker image to run command from within application's docker image
*
**/
var cwd = process.cwd()
	, executeCommand = require('./executeCommand')
	;

var imageName;

function checkForDockerfile () {
	try {
		require.resolve(cwd + '/Dockerfile');
		return true;
	} catch (e) {
		return null;
	}
}

function rebuildOptions (args) {
	// remove docker and watch options
	// add back "--"
	return Object.keys(args)
		.filter(function (a) {
			// scrub watch and add leading -- back
			return (a !== 'watch' && a !== 'docker');
		})
		.map(function (a) {
			return '--' + a;
		});
}


function buildBaseImage (cb) {
	executeCommand('docker', ['build', '-t', imageName , '.'], cwd, cb);
}

function runImage (commands, args) {
	// build docker run command
	var options = rebuildOptions(args)
			, runArgs = [
					'run',
					'--rm',
					'-t',
					'-v',
					cwd  + ':' + '/tmp/astro/app',
					imageName,
					'./node_modules/.bin/astro'].
					concat(commands).
					concat(options).
					concat(['--force']);

	// run image
  executeCommand('docker', runArgs, cwd);
}

module.exports = function (commands, args, fromWatch) {
	var dir = cwd.split('/');

	// set imageName for the name of the project
	imageName = 'astro-' + dir[dir.length -1];

	//first: get application's DockerFile to server as base image
	var dockerFile = checkForDockerfile();

	if (!dockerFile) {
		return console.log('No DockerFile message'); //TODO route to proper message
	}

	if (!fromWatch) {
		buildBaseImage(function (err) {
			if (err) {
				throw err;
			}
			runImage(commands, args);
		});
	} else {
		runImage(commands, args);
	}

};