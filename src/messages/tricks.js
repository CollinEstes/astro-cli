
var print = require('./print.js');

/**
*
* show help message
*
**/
function tricks () {

	print([
    " ",
    " ",
    "     *   lint javascript",
    "         -$ 'astro lint'",
    "     *   test javascript",
    "         -$ 'astro test'",
    "     *   transpile javascript",
    "         -$ 'astro babel'",
    " ",
    ]);

}

module.exports = tricks;
