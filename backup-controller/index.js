const path = require('path');
const fs = require('fs');
module.exports.backupMangaJson = () => {
    const dataPath = path.join(__dirname, '..', 'data', 'manga.json');
    const backupPath = path.join(__dirname, '..', 'backup', 'manga.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    if (JSON.stringify(data) != JSON.stringify(backup)) {
        console.log('Different');
        fs.writeFileSync(backupPath, JSON.stringify(data));
    }
};
