/**
*
* watcher.js - Sets up a chokidar watch on the current working directory
*
**/


var chokidar = require('chokidar');

var fileChangeMsg = require('./messages/fileChange.js')
	, processCommands = require('./processCommands.js')
	;

module.exports = function (commands, args) {
	chokidar.watch('.', {
			ignored: /[\/\\]\./,
			persistent: true})
	.on('change', function (path) {

		// print the path of what changed
		fileChangeMsg(path);

		// run the command that we were watching for
		processCommands(commands, args);

	});
};