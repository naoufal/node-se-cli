var request = require('superagent');
var cli     = require('cli');
var clc     = require('cli-color');
var spawn   = require('child_process').spawn;
var exec    = require('child_process').exec;


/**
 * Starts Selenium Server on default port and waits for it to be up.
 */
var startSelenium = function() {
  isSeleniumRunning(function(err, is_running){
    if (is_running) {
      return console.log(clc.yellow('Selenium is already running.\n'));
    }
    var selenium = spawn('java', ['-jar', __dirname + '/selenium-server-standalone-2.39.0.jar', '&'], {
      detached: true
    });

    cli.spinner('Starting Selenium...');
    pollSeleniumStatus();
  });
};


/**
 * Stops Selenium Server, if it's running.
 */
var stopSelenium = function() {
  getSeleniumProcessID(function(err, pid){
    if (err) {
      return console.log(clc.yellow('Nothing to stop.  Selenium is not running.  Run `se34 start` to start Selenium Server.\n'));
    }
    exec('kill ' + pid, function (err, stdout, stderr) {
      if (err) return console.log('exec error: ' + err);
      console.log('Selenium stopped.\n');
    });
  });
};


/**
 * Verififies that Selenium is running and ready.
 *
 * @param {Function} callback
 */
var isSeleniumRunning = function(cb) {
  request.get('http://localhost:4444/wd/hub/status')
    .end(function(err, res){
      if (err) {
        return cb(null, false);
      }
      return cb(null, true);
    });
};


/**
 * Polls until Selenium is up. Returns on true
 * polls again on false.
 *
 * @private
 */
var pollSeleniumStatus = function() {
  var POLL_INTERVAL = 1000;

  isSeleniumRunning(function(err, is_running){
    if (is_running) {
      cli.spinner(clc.green('Selenium is running.\n\n'), true);
      return process.exit(0);
    }

    setTimeout(function(){
      pollSeleniumStatus();
    }, POLL_INTERVAL);
  });
};


/**
 * Gets Selenium process id, if server is running.
 *
 * @param {Function} callback
 */
var getSeleniumProcessID = function(cb) {
  // get process id for selenium and grep
  exec('ps aux | grep selenium-server-standalone | grep -v grep | awk \'{print $2}\'', function (err, pid) {
    if (err || !pid) {
      return cb(new Error('Selenium is not running'));
    }

    return cb(null, pid);
  });
};


module.exports.startServer = startSelenium;
module.exports.stopServer = stopSelenium;
module.exports.isRunning = isSeleniumRunning;
module.exports.getProcessID = getSeleniumProcessID;