/**
*
* watcher.js - Sets up a chokidar watch on the current working directory
*
**/


var chokidar = require('chokidar')
  , chalk = require('chalk')
  ;

var fileChangeMsg = require('./messages/fileChange.js')
	, processCommands = require('./processCommands.js')
	, processCommandsInContainer = require('./processCommandsInContainer')
	;

module.exports = function (commands, args) {
	"use strict";

	let watcherOptions = {
				ignored: ['node_modules', 'dist', '.*/*'],
        ignoreInitial: true,
				persistent: true
			}
    , stuffToWatch = ['src', 'test']
    , stw_string = stuffToWatch.reduce(function (acc, thisOne, arr) {
        acc += `  ${chalk.bold(thisOne)} \n`;
        return acc;
      }, '\n')
    , directory_word = `${stuffToWatch.length > 1 ? 'directories' : 'directory'}`
		;

  console.log(chalk['bgGreen']['white'](`\n Astro is on the case. He's sniffing out changes the following ${directory_word}: ${stw_string}`));

	chokidar.watch(stuffToWatch, watcherOptions)
	.on('change', function (path) {
		// print the path of what changed
		fileChangeMsg(path);
		// run the command that we were watching for
		if (args.docker) {
			processCommandsInContainer(commands, args, true);
		} else {
			processCommands(commands, args);
		}

	});
};