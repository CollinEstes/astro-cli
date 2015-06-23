/**
*
* processCommandInContianer.js - setups up docker image to run command from within application's docker image
*
**/



module.exports = function (command, args) {

	//first: create tmp folder and copy cwd into tmp folder

	//second: Add astro-cli and command module to the package.json of the cwd app
	// 	-- the assumption here is that the application's dockerfile does an npm install on the application


	//third: build docker image for application

	//fourth: run built docker container overriding cmd to execute astro command

};