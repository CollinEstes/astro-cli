/**
*
* noAliasMethod.js
*
**/
var print = require('./print');

/**
*
* show help message
*
**/
function noAlias () {

	print([
    " ",
    " ",
    "Must provide commands/options to set new alias",
    " ",
    "ex. 'astro alias compile babel sass' (will create 'compile' alias which runs babel & sass)",
    ], 'red');

}

module.exports = noAlias;
