var cli = require('cli');
var clc = require('cli-color');
var se34 = require('./se-cli');



// defines cli commands
cli.parse(null, ['start', 'stop', 'status', 'pid']);

cli.main(function (args, options) {

  if (cli.command == 'start') {
    se34.startServer();
  }

  if (cli.command == 'stop') {
    se34.stopServer();
  }

  if (cli.command == 'status') {
    se34.isRunning(function(err, is_running){
      if (is_running) {
        return console.log(clc.green('Selenium is running.\n'));
      }

      console.log(clc.yellow('Selenium is not running.\n'));
    });
  }

  if (cli.command == 'pid') {
    se34.getProcessID(function(err, pid){
      if (err) {
        return console.log('No process id. Selenium is not currently running.\n');
      }
      console.log('Process ID: ' + pid);
    });
  }
});
