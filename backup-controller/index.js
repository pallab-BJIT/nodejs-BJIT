const path = require('path');
const fs = require('fs');

module.exports.backupMangaJson = () => {
    const dataPath = path.join(__dirname, '..', 'data', 'manga.json');
    const backupPath = path.join(__dirname, '..', 'backup', 'manga.json');

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    let logMessage = '';
    if (JSON.stringify(data) != JSON.stringify(backup)) {
        const date = new Date();
        const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';
        const dateFormat = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} ${amOrPm}`;

        if (data.length > backup.length) {
            console.log(`Data added at ${dateFormat}`);
            logMessage = `Data added at ${dateFormat}`;
        } else if (data.length < backup.length) {
            console.log(`Data deleted at ${dateFormat}`);
            logMessage = `Data deleted at ${dateFormat}`;
        } else {
            console.log(`Data updated at ${dateFormat}`);
            logMessage = `Data updated at ${dateFormat}`;
        }
        fs.writeFileSync(backupPath, JSON.stringify(data));
        const logFilePath = path.join(__dirname, '..', 'logs', 'log.txt');
        fs.appendFileSync(logFilePath, logMessage + '\n');
    }
};
