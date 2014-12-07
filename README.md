node-se-cli [![NPM Version](https://img.shields.io/npm/v/se-cli.svg)](https://www.npmjs.org/package/se-cli)
==========
A Selenium command line interface.

![se-cli](https://cloud.githubusercontent.com/assets/1627824/5332283/03cd5c7c-7e1f-11e4-9391-4b9eb347cdd6.gif)

## Install

```shell
npm install -g se-cli
```

## Documentation

### Commands
- [`start`](https://github.com/naoufal/node-se-cli#start)
- [`stop`](https://github.com/naoufal/node-se-cli#stop)
- [`status`](https://github.com/naoufal/node-se-cli#status)
- [`pid`](https://github.com/naoufal/node-se-cli#pid)

## Commands

## start
Starts a Selenium Server on port 4444 if there isn't one already running.

__Example__
```shell
se start

# Starting Selenium... -
# Selenium is running. \
```
<hr>

## stop
Stops the Selenium Server.

__Example__
```shell
se stop

# Selenium stopped.
```
<hr>

## status
Returns the status of the Selenium Server.

__Example__
```shell
se status

# Selenium is not running.
```
<hr>
## pid
Returns the process ID of the Selenium Server.

__Example__
```shell
se pid

# Process ID: 9678
```
<hr>

