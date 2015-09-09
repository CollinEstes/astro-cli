/**
*
* executeCommand.js - processes the output to the terminal
*
**/

var chalk = require('chalk')
	, spawn = require('child_process').spawn
	, _ = require('lodash')
	;


function runCommand (cmd, args, directory, cb) {
	// silence "--good dog" response if it is a docker cmd
	var child
		, silentPraise = cmd === 'docker';

	// executate command
	if (process.platform === "win32") {
		child = spawn(process.env.comspec || "cmd.exe", [ "/c", cmd ].concat(args), {stdio: "inherit", cwd: directory});
	} else {
		child = spawn(cmd, args, {stdio: "inherit", cwd: directory});
	}

	// handle exit
	child.on('exit', function (code) {
		if (code === 0) {

			if (!silentPraise) {
				console.log(chalk.green(`-- ✔ good dog --`));
			}

			if (cb) {
        return cb(null, code);
      }

		} else {
			console.log(chalk.red('-- ☁ Astro completed with code:', cmd, code));

			if (cb) {
        cb(new Error(` Astro command failed code ${code}`), code);
      }

		}
	});
}

module.exports = runCommand;
