const fs = require('fs');
const { failure } = require('../../util/common');

const addToLog = (logMessage) => {
    const logFilePath = './logs/log.txt';
    fs.appendFile(logFilePath, logMessage + '\n', (err) => {
        if (err) {
            res.writeHead(500, {
                'Content-Type': 'application/json',
            });
            res.write(
                JSON.stringify({
                    message: "Couldn't write File",
                })
            );
            return res.end();
        }
    });
};
const addNewData = (req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });

    req.on('end', () => {
        try {
            const product = JSON.parse(body);
            if (!product.name) {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.write(JSON.stringify(failure('Name is required')));
                res.end();
            } else if (!product.price) {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.write(JSON.stringify(failure('Price is required')));
                res.end();
            } else if (!product.stock) {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.write(JSON.stringify(failure('Stock is required')));
                res.end();
            } else if (!product.author) {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.write(JSON.stringify(failure('Author is required')));
                res.end();
            }
            const path = './data/manga.json';
            if (fs.existsSync(path)) {
                fs.readFile(path, (err, data) => {
                    if (!err) {
                        const jsonData = JSON.parse(data);
                        console.log(jsonData);
                        const newProduct = {
                            id: jsonData[jsonData.length - 1].id + 1,
                            ...product,
                        };
                        jsonData.push(newProduct);
                        fs.writeFile(path, JSON.stringify(jsonData), (err) => {
                            if (err) {
                                res.writeHead(500, {
                                    'Content-Type': 'application/json',
                                });
                                res.write(
                                    JSON.stringify({
                                        message: "Couldn't write File",
                                    })
                                );
                                return res.end();
                            } else {
                                const logMessage = `New Data added at ${new Date()}`;
                                addToLog(logMessage);
                                res.writeHead(200, {
                                    'Content-Type': 'application/json',
                                });
                                res.write(
                                    JSON.stringify({
                                        message: 'Successfully wrote file',
                                    })
                                );
                                return res.end();
                            }
                        });
                    } else {
                        res.writeHead(500, {
                            'Content-Type': 'application/json',
                        });
                        res.write(
                            JSON.stringify({
                                message: 'May be the file do not exist',
                            })
                        );
                        return res.end();
                    }
                });
            } else {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                });
                res.write(
                    JSON.stringify({
                        message: 'May be the file do not exist',
                    })
                );
                return res.end();
            }
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

module.exports = addNewData;
