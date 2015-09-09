/**
*
* fileChange.js
* @param:path - The path of the file that changed (string)
*
**/
var print = require('./print')
  , chalk = require('chalk')
  ;

/**
*
* show help message
*
**/
function fileChange (path) {

	print([
    " ",
    `  Astro sniffed out a change to ${chalk['blue'](path)}`,
    " "
    ], 'white');

}

module.exports = fileChange;
