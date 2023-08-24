const fs = require('fs').promises;
const path = require('path');

async function addToLog(message) {
    const logFilePath = path.join(__dirname, '..', 'logs', 'log.txt');
    try {
        // Check if the log file exists, if not, create it
        const fileExists = await fs
            .access(logFilePath)
            .then(() => true)
            .catch(() => false);

        if (!fileExists) {
            await fs.writeFile(logFilePath, '', 'utf-8');
        }

        // Append the new log message to the file
        await fs.appendFile(
            logFilePath,
            `${new Date().toISOString()} - ${message}\n`
        );
    } catch (error) {
        console.error('Error adding log:', error);
    }
}

module.exports = addToLog;
