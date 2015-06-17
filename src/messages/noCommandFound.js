/**
*
* print messages
* @param:messages - Array of strings
*
**/
function print (messages) {
	messages.forEach(function (message) {
		console.log(message);
	});
};

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
    "     *   lint javascript",
    "         -$ 'astro jshint'",
    "     *   test javascript",
    "         -$ 'astro mocha'",
    "     *   transpile javascript",
    "         -$ 'astro babel'",
    " ",
    " ",
    "Astro can do his tricks together:",
    " ",
    "         -$ 'astro jshint mocha'",
    "         -$ 'astro babel mocha jshint'",
    " ",
    " ",
    "Astro can watch you work and do his tricks without being asked:",
    " ",
    "         -$ 'astro jshint:watch mocha:watch'",
    " ",
    " ",
    "Astro follows you from project to project",
    " ",
    "       -$ 'cd myWebApp'",
    "       -$ 'astro jshint'      (Astro lints myWebApp)",
    "       -$ 'cd ../myNodeApp'",
    "       -$ 'astro jshint'      (Astro lints myNodeApp)",
    " ",
    " ",
    "Astro doesn't like to read, so no config necessary",
    " ",
    " ",
    "Astro can learn new tricks as he grows up",
    " ",
    "       -$ 'astro update'",
    " ",
    " ",
    "Just remember Astro needs Docker to do his tricks ",
    "so make sure you are on Linux or use boot2docker on OSX/Windows",
    " ",
    " ",
    " ",
    "...good boy Astro...",
    " ",
    ]);

}

module.exports = help;
