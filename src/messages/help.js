
var print = require('./print.js');

/**
*
* show help message
*
**/
function help () {

	print([
    " ",
    " ",
    "Astro:  The space age delevoper's best friend",
    " ",
    " ",
    "Astro is ready to peform tricks based on your commands:",
    " ",
    "     lint javascript",
    "       $ 'astro jshint'",
    " ",
    "     test javascript",
    "       $ 'astro mocha'",
    " ",
    "     transpile javascript",
    "       $ 'astro babel'",
    " ",
    " ",
    "Astro can do his tricks together:",
    " ",
    "       $ 'astro jshint mocha'",
    "       $ 'astro babel mocha jshint'",
    " ",
    " ",
    "Astro can watch you work and do his tricks without being asked:",
    " ",
    "       $ 'astro mocha --watch'",
    " ",
    " ",
    "Astro follows you from project to project",
    " ",
    "       $ 'cd myWebApp'",
    "       $ 'astro jshint'      (Astro lints myWebApp)",
    "       $ 'cd ../myNodeApp'",
    "       $ 'astro jshint'      (Astro lints myNodeApp)",
    " ",
    " ",
    "Astro's commands come from modules to discover more modules visit:",
    "https://www.npmjs.com/search?q=astro-",
    " ",
    " ",
    "No need to install astro modules, Astro will fetch them for you when you ask:",
    "       $ 'astro someNewModule'     (Astro installs someNewModule and executes it)",
    " ",
    " ",
    "Astro doesn't like to read, so no config necessary",
    " ",
    " ",
    "...good boy Astro...",
    " ",
    ], 'green');

}

module.exports = help;
