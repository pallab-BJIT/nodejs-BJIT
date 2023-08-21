const { backupMangaJson } = require('./backup-controller');
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('backup', backupMangaJson);

setInterval(() => {
    emitter.emit('backup');
}, 2000);
