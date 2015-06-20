/**
*
* print messages
* @param:messages - Array of strings
*
**/
var print = require('./print');

/**
*
* show help message
*
**/
function noCommand (cmd) {

	print([
    " ",
    " ",
    "Astro does not know command: " + cmd,
    " ",
    "You can try to astro install " + cmd,
    "if the astro plugin exists it must be named: astro-" + cmd
    ]);

}

module.exports = noCommand;
