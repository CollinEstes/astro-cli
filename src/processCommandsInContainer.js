/**
*
* processCommandsInContainer.js
*
**/
var cwd = process.cwd()
	, tmp = require('tmp')
	, fs = require('fs')
	, LineByLineReader = require('line-by-line')
	;


function createTmpFile (lines) {
	// on completion of reading the calling module's Dockerfile,
		// create the astro version of the found DockerFile
		if (lines.length === 0) {
			return console.log('No Dockerfile found in:' + cwd);
		}

		var tmpObj = tmp.fileSync()
			,	file = fs.createWriteStream(tmpObj.name);

		file.on('error', function (err) { console.log(err)});

		file.write(lines.join('\n'));

		fs.readFile(tmpObj.name, function (err, data) {
			var buff = new Buffer(data);
			console.log(buff.toString('utf-8'));
		});
}


module.exports = function (command, args) {
	var pathArray = cwd.split('/')
		, moduleName = pathArray[pathArray.length - 1]
		, lr = new LineByLineReader(cwd + '/Dockerfile')
		, lines = []
		, foundAstro = false
		;

	lr.on('error', function (err) {
    console.log('Could not find a Dockerfile');
	});

	lr.on('line', function (line) {
		 // if we have not found astro yet
		 if (!foundAstro) {
		 	//check for Astro on the current line
		 	if (line === '#ASTRO') {
		 		// set foundAstro to stop saving lines
	    	return foundAstro = true;
	    } else {
	    	// push the line into lines
	    	lines.push(line);
	    }
		 }
	});

	lr.on('end', function () {
		if (!foundAstro) {
			// print message explaining how to put #ASTRO in Dockerfile
			console.log('Must put #ASTRO comment in Dockerfile');
			console.log('place #ASTRO on the line where Environment is ready for astro to run');
		}
		createTmpFile(lines);
	});
}
