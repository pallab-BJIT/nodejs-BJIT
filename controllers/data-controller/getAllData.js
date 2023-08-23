const fs = require('fs');
const url = require('url');
const { failure, success } = require('../../util/common');

const getAllData = (req, res) => {
    try {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
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
                    if (!filteredData.length) {
                        res.end(JSON.stringify(failure('No data found')));
                    } else {
                        res.end(
                            JSON.stringify(success('Data found', filteredData))
                        );
                    }
                } else {
                    res.end(JSON.stringify(success('Data found', jsonData)));
                }
            } else {
                res.end(
                    JSON.stringify(failure('May be the file is corrupted'))
                );
            }
        });
    } catch (error) {
        res.writeHead(500, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(failure('Internal Server Error')));
    }
};

module.exports = getAllData;
