const BackupEventEmitter = require('./backup-emitter');
const { backupMangaJson } = require('./backup-controller');

BackupEventEmitter.on('backup', backupMangaJson);

setInterval(() => {
    BackupEventEmitter.emit('backup');
}, 2000);
