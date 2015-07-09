/**
*
* processAliasCommands.js - handles the processing of all 'astro alias(es) ...' commands
*
**/

var prettyJson = require('prettyjson')
	, noAliasMessage = require('./messages/noAliasMessage')
	, aliases = require('../defaults/aliases.json')
	;


var jsonFormatColors = {
	keysColor: 'green',
	dashColor: 'white',
	stringColor: 'red'
};

function showAliases (value) {
	console.log(prettyJson.render(value, jsonFormatColors));
}

module.exports = function (commands, args) {
	var aliasCommands = commands.slice(1)
		, newCommands = commands.slice(2)
		, updatedAliasCommand = [];

	// 'astro alias' display alias json
	if (aliasCommands.length === 0) {
		return showAliases(aliases);
	} else {
		if (newCommands.length === 0) {
			return noAliasMessage();
		}
	// 'astro alias + commands/args' sets alias to new command
		newCommands.forEach(function (cmd) {
			updatedAliasCommand.push(cmd);
		});

		Object.keys(args).forEach(function (key) {
			updatedAliasCommand.push('--' + key);
		});

		//overwrite or save new alias
		aliases[aliasCommands[0]] = updatedAliasCommand;

		showAliases(aliases);

	}
}
