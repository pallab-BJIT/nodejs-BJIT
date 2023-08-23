const fs = require('fs');
const { failure, success } = require('../../util/common');
const deleteSingleFileById = (req, res) => {
    try {
        const id = +req.url.split('/')[3];
        console.log({ id });
        const path = './data/manga.json';
        fs.readFile(path, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(failure('Cannot read the file')));
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData.findIndex((ele) => ele.id === id);
                if (index !== -1) {
                    const filteredData = jsonData.filter((ele) => {
                        return ele.id !== id;
                    });
                    fs.writeFile(path, JSON.stringify(filteredData), (err) => {
                        if (err) {
                            res.writeHead(500, {
                                'Content-Type': 'application/json',
                            });
                            res.end(
                                JSON.stringify(failure('Cannot read the file'))
                            );
                        } else {
                            res.writeHead(500, {
                                'Content-Type': 'application/json',
                            });
                            res.end(
                                JSON.stringify(
                                    success(
                                        'Data Deleted Successfully',
                                        filteredData
                                    )
                                )
                            );
                        }
                    });
                } else {
                    res.writeHead(400, {
                        'Content-Type': 'application/json',
                    });
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
    }
};

module.exports = deleteSingleFileById;
