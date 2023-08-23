const fs = require('fs');
const { failure, success } = require('../../util/common');
const getSingleDataDetails = (req, res) => {
    try {
        const id = +req.url.split('/')[3];
        const path = './data/manga.json';
        fs.readFile(path, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(failure('Cannot read the file')));
            } else {
                const jsonData = JSON.parse(data);
                const filteredData = jsonData.find((ele) => {
                    return ele.id === id;
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                if (filteredData) {
                    res.end(
                        JSON.stringify(
                            success('Data retrieved successfully', filteredData)
                        )
                    );
                } else {
                    res.end(
                        JSON.stringify(
                            failure(`The data with id = ${id} do not exists`)
                        )
                    );
                }
            }
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
        console.log(error);
    }
};

module.exports = getSingleDataDetails;
