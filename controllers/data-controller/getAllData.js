const fs = require('fs');
const getAllData = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    try {
        const path = './data/manga.json';
        fs.readFile(path, (err, data) => {
            if (!err) {
                const jsonData = JSON.parse(data);
                res.end(JSON.stringify(jsonData));
            } else {
                res.end(
                    JSON.stringify({
                        message: 'May be the file is corrupted',
                    })
                );
            }
        });
    } catch (error) {
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

module.exports = getAllData;
