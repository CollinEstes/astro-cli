/**
*
* parseCommandsSpec.js - Mocha test
*
**/

var chai = require('chai');
var expect = require('chai').expect;

var aliases = require('../aliases.json');
var parser = require('../src/parseArgv.js');

describe('parseArgv.js', function () {

	before(function () {
		this.commands = [
			'/bin/iojs',
			'/Users/collinestes/work/node/astro-cli/index',
			'mocha',
			'--chai',
			'--watch'
		];

		this.aliasedCommands = [
			'/bin/iojs',
			'/Users/collinestes/work/node/astro-cli/index',
			'test'
			];

		this.aliasedCommandsWithOption = [
			'/bin/iojs',
			'/Users/collinestes/work/node/astro-cli/index',
			'test',
			'--watch'
			];
	})

	it('should return an object with _ as a property', function () {
		var r = parser(this.commands);
		expect(r).to.be.instanceof(Object);
		expect(r._).to.be.instanceof(Array);
		expect(r._.length).to.equal(1);
	});

	it('should parse arguments', function () {
		var r = parser(this.commands);
		expect(r.chai).to.exist;
		expect(r.watch).to.exist;
	});

	it('should handle aliases', function () {
		var r = parser(this.aliasedCommands, aliases);
		expect(r._[0]).to.equal('mocha');
		expect(r.chai).to.exist;
		expect(r.sinon).to.exist;
	});

	it('should handle aliases with additional watch commands', function () {
		var r = parser(this.aliasedCommandsWithOption, aliases);
		expect(r.watch).to.exist;
	});

});
