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
		;

	lr.on('error', function (err) {
    console.log('Could not find a Dockerfile');
	});

	lr.on('line', function (line) {
	  // push the line into lines
  	lines.push(line);
	});

	lr.on('end', function () {
		if (lines.length === 0) {
			// print message explaining how to put #ASTRO in Dockerfile
			console.log('Could not find a Dockerfile');
		}
		createTmpFile(lines);
	});
}
