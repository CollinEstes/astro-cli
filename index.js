#! /usr/bin/env nodejs
var spawn = require('child_process').spawn,
    astroCmd = process.argv[2],
    cmd = spawn('docker', ['run',
                              '-t',
                              '-v',
                              '/$(pwd):/src/app',
                              'mikefielden/astrokit:'+ astroCmd ]);

cmd.stdout.on('data', function (data) {
  console.log(data.toString());
});

cmd.stderr.on('data', function (data) {
  console.log('stderr', data.toString());
});

cmd.on('exit', function (code) {
  console.log('astro %s completed with code %s', astroCmd, code);
});



//var args = process.argv;
//
//// first two args are bash and bin/astro
//var command = args[2];
//
//
//
//  var exec = require('child_process').exec;
//
//  exec('docker run -t -v /$(pwd):/src/app mikefielden/astrokit:jshint', function (error, stdout, stderr) {
//    if (error) {
//      console.error(error, stderr);
//    }
//
//    console.log(stdout);
//  });
