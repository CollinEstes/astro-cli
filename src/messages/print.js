/**
*
* print messages
* @param:messages - Array of strings
* @param:color - The color of the message
*
**/

var chalk = require('chalk');

module.exports = function (messages, color) {
	messages.forEach(function (message) {
		if (!color) {
			color = 'white';
		}
		console.log(chalk[color](message));
	});
};