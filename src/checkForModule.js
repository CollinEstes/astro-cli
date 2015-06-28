/**
*
* checkForModule.js - checks if module matching command exists.
*
* @params
* 	- cmd:  The command to be execute for which a module must exist
*
* @returns
*		- String: the module name or null if it is not found
**/

function checkForModule (cmd) {
	var moduleName = "astro-" + cmd;
	try {
		require.resolve(moduleName);
		return moduleName;
	}
	catch (e) {
		return null;
	}
}

module.exports = checkForModule