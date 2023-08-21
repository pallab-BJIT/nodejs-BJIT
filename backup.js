const BackupEventEmitter = require('./backup-emitter');
const path = require('path');
const fs = require('fs');
const { backupMangaJson } = require('./backup-controller');

BackupEventEmitter.on('backup', backupMangaJson);

setInterval(() => {
    BackupEventEmitter.emit('backup');
}, 2000);
