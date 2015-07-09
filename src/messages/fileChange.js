/**
*
* fileChange.js
* @param:path - The path of the file that changed (string)
*
**/
var print = require('./print');

/**
*
* show help message
*
**/
function fileChange (path) {

	print([
    " ",
    " ",
    "Astro saw a change to file: " + path,
    " "
    ], 'yellow');

}

module.exports = fileChange;
