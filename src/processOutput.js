/**
*
* processOutput.js - processes the output to the terminal
*
**/
var chalk = require('chalk')
	, spawn = require('child_process').spawn
	, _ = require('lodash')
	;


function runCommand (cmd, args, cb) {
	var child = spawn(cmd, args, {stdio: "inherit"});

	child.on('exit', function (code) {
		if (code === 0) {
			console.log(chalk.green('--good dog'));
			if (cb) { cb() };
		} else {
			console.log(chalk.red('astro completed with code:', cmd, code));
			if (cb) { cb(new Error('astro command failed code' + code)) };
		}

	});
}

module.exports = runCommand;
