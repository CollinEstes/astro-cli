/**
*
* processCommandsSpec.js
*
**/

var proxyquire = require('proxyquire');

// spy counts
var processCount = checkCount = 0;

// test stubs
var processContainerSpy = function () {
		return processCount++;
	}
	, checkForModuleSpy = function () {
		checkCount++;
		return null;
	}
	;



// proxyquire processCommands with Spies
var pCommands = proxyquire('../src/processCommands', {
	'./processCommandInContainer': processContainerSpy,
	'./checkForModule': checkForModuleSpy
});



describe('processCommands.js', function () {


		beforeEach(function () {
			// reset spy counts
			processCount = checkCount = 0;
		});


		it('should call checkForModule for each command supplied', function () {
			var commands = ['mocha', 'jshint']
				, options = {'force': true};

			pCommands(commands, options);
			expect(checkCount).to.equal(2);
		});

		// it('should call processCommandInContainer for each command when --docker is supplied', function () {
		// 	var commands = ['mocha', 'jshint']
		// 		, options = {'docker': true};

		// 	pCommands(commands, options);
		// 	expect(processCount).to.equal(2);
		// });


});
