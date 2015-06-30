/**
*
* processInstallCommands.js - handles the 'astro install' commands
*
**/
var path = require('path')
	, fs = require('fs')
	, cwd = process.cwd()
	;

var executeCommand = require('./executeCommand.js');

function checkForLocal (path) {
	try {
    // Query the entry
     var stats = fs.lstatSync(path);

    // Is it a directory?
    if (stats.isDirectory()) {
        return true;
    }

    return false;
	}
	catch (e) {
	    return false;
	}
	}

module.exports = function (commands, options, cb) {
	var moduleNames = commands.slice(1)
		, dir = path.dirname(fs.realpathSync(__filename))
		, localPath = cwd + '/node_modules/astro-cli'
		, hasLocal = checkForLocal(localPath)
		;

	moduleNames.forEach(function (name) {
		if (name.indexOf('astro-') === -1) {
			name = 'astro-' + name;
		}

		// install into local astro-cli if exists (to prevent re-installing when working with --docker option)
		if (hasLocal) {
			executeCommand('npm', ['install', name], localPath);
		}

		// install into global astro-cli
		executeCommand('npm', ['install', name], dir, cb);
	})

};
