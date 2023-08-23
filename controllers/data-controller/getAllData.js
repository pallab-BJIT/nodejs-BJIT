const fs = require('fs');
const url = require('url');

const getAllData = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    try {
        const path = './data/manga.json';
        let parsedUrl;
        let queryParams;
        let nameQuery;
        if (req.url.includes('?')) {
            parsedUrl = url.parse(req.url, true);
            queryParams = parsedUrl.query;
            nameQuery = JSON.parse(queryParams.name);
        }
        fs.readFile(path, (err, data) => {
            if (!err) {
                const jsonData = JSON.parse(data);
                const filteredData = jsonData.filter((ele) => {
                    return ele.name === nameQuery;
                });
                if (req.url.includes('?')) {
                    res.end(JSON.stringify(filteredData));
                } else {
                    res.end(JSON.stringify(jsonData));
                }
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
