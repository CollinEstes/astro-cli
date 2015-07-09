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
function noModule (cmd) {

	print([
    "",
    "",
    "Astro can't find a module named: astro-" + cmd,
    "",
    "If the astro module exists it must be named: astro-" + cmd,
    "",
    ""
    ], 'red');

}

module.exports = noModule;
