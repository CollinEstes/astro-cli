/**
*
* processCommandInContianer.js - setups up docker image to run command from within application's docker image
*
**/
var cwd = process.cwd()
	, executeCommand = require('./executeCommand')
	;

var imageName;

function checkForDockerfileDefault () {
	try {
		require.resolve(cwd + '/Dockerfile');
		return 'Dockerfile';
	} catch (e) {
		return null;
	}
}

function getDockerFileName () {
	try {
		require.resolve(cwd + '/Dockerfile.astro');
		return 'Dockerfile.astro';
	} catch (e) {
		return checkForDockerfileDefault();
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


function buildBaseImage (dockerFileName, cb) {
	executeCommand('docker', ['build', '-t', imageName , '-f', dockerFileName, '.'], cwd, cb);
}

function runImage (commands, args) {
	// build docker run command
	var options = rebuildOptions(args)
			, cmd = ['./node_modules/.bin/astro'].concat(commands).concat(options).concat(['--force']).join(' ')
			, runArgs = [
					'run',
					'--rm',
					'-t',
					'-v',
					cwd  + ':' + '/tmp/astro/app',
					imageName,
					cmd];

	// run image
  executeCommand('docker', runArgs, cwd);
}

module.exports = function (commands, args, fromWatch) {
	var dir = cwd.split('/');
	var dockerFile = getDockerFileName();

	// set imageName for the name of the project
	imageName = 'astro-' + dir[dir.length -1];

	if (!dockerFile) {
		return console.log('No DockerFile message'); //TODO route to proper message
	}

	if (!fromWatch) {
		buildBaseImage(dockerFile, function (err) {
			if (err) {
				throw err;
			}
			runImage(commands, args);
		});
	} else {
		runImage(commands, args);
	}

};