const path = require('path');
const fs = require('fs');

const logMessageToFile = (message, filePath) => {
    fs.appendFileSync(filePath, message + '\n');
};

module.exports.backupMangaJson = () => {
    const dataPath = path.join(__dirname, '..', 'data', 'manga.json');
    const backupPath = path.join(__dirname, '..', 'backup', 'manga.json');

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    let logMessage = '';
    if (JSON.stringify(data) != JSON.stringify(backup)) {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const hours = date.getHours() % 12;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';
        const dateFormat = `${day} / ${month} -> ${hours} : ${minutes} : ${seconds} ${amOrPm}`;

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
        logMessageToFile(logMessage, logFilePath);
    }
};
