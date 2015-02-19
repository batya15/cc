var intel = require('intel'),
    path = require('path'),
    fs = require('fs');

try {
    fs.mkdirSync('log');
} catch(e) {}

intel.config({
    formatters: {
        'simple': {
            'format': '[%(levelname)s:] %(name)s. %(message)s',
            'colorize': true
        },
        'details': {
            'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
            'strip': true
        }
    },
    handlers: {
        'terminal': {
            'class': intel.handlers.Console,
            'formatter': 'simple',
            'level': intel.VERBOSE
        }/*,
        'logfile': {
            'class': intel.handlers.File,
            'file': 'log/report.log',
            'formatter': 'details'
        }*/
    },
    loggers: {
        'log': {
            'handlers': ['terminal'],
            'handleExceptions': true,
            'exitOnError': false,
            'propagate': false
        }
    }
});

function getLogger(module) {
    var filename = path.basename(module.filename);
    return intel.getLogger('log.'+filename);
}


module.exports = getLogger;