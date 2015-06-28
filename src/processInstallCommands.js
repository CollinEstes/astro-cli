/**
*
* processInstallCommands.js - handles the 'astro install' commands
*
**/
var path = require('path')
	, fs = require('fs')
	;

var executeCommand = require('./executeCommand.js');

module.exports = function (commands, options, cb) {
	var moduleNames = commands.slice(1);
	var dir = path.dirname(fs.realpathSync(__filename));


	moduleNames.forEach(function (name) {
		if (name.indexOf('astro-') === -1) {
			name = 'astro-' + name;
		}

		executeCommand('npm', ['install', name], dir, cb);
	})

};
