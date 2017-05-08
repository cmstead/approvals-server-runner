'use strict';

var child = require('child_process');
var path = require('path');

var runnerPath = [__dirname, '.', 'runner'].join(path.sep);

function runnerFactory() {
    var server = null;

    function start(configPath, callback) {
        var cleanCallback = typeof callback === 'function' ? callback : function () { };
        var args = [configPath];

        stop();

        server = child.fork(runnerPath, args);
        server.disconnect();

        setTimeout(callback, 250);
    }

    function stop() {
        if (server !== null) {
            server.kill();
        }

        server = null;
    }

    return {
        start: start,
        stop: stop
    };
}

module.exports = runnerFactory;