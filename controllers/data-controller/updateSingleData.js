const fs = require('fs');
const { failure, success } = require('../../util/common');

const updateDataById = (req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });

    req.on('end', () => {
        try {
            const product = JSON.parse(body);
            const id = +req.url.split('/')[3];
            const path = './data/manga.json';
            fs.readFile(path, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(failure('Cannot read the file')));
                } else {
                    const jsonData = JSON.parse(data);
                    const index = jsonData.findIndex((ele) => ele.id === id);

                    if (index !== -1) {
                        jsonData[index] = { ...jsonData[index], ...product };

                        fs.writeFile(path, JSON.stringify(jsonData), (err) => {
                            if (err) {
                                res.writeHead(500, {
                                    'Content-Type': 'application/json',
                                });
                                res.end(
                                    JSON.stringify(
                                        failure('Cannot read the file')
                                    )
                                );
                            } else {
                                res.writeHead(500, {
                                    'Content-Type': 'application/json',
                                });
                                res.end(
                                    JSON.stringify(
                                        success(
                                            'Updated Deleted Successfully',
                                            jsonData
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
                                failure(
                                    `The data with id = ${id} do not exists`
                                )
                            )
                        );
                    }
                }
            });
        } catch (err) {
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.write(
                JSON.stringify({
                    message: 'Internal Server Error',
                })
            );
            res.end();
        }
    });
};

module.exports = updateDataById;
