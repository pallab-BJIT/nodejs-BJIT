const EventEmitter = require('events');

class BackupEventEmitter extends EventEmitter {
    backup() {
        this.emit('backup');
    }
}

module.exports = new BackupEventEmitter();
