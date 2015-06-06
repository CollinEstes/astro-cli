#! /usr/bin/env nodejs
var spawn = require('child_process').spawn,
    astroCmd = process.argv[2],
    cwd = process.cwd(),
    cmd = spawn('docker', ['run',
                              '-t',
                              '-v',
                              cwd+':/src/app',
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