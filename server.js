const http = require('http');
const fs = require('fs');
const path = require('path');
const { failure } = require('./util/common');
const addData = require('./controllers/data-controller/addData');
const addNewData = require('./controllers/data-controller/addData');
// const { success, failure } = require('./util/common');
const server = http.createServer((req, res) => {
    if (req.url === '/products/all' && req.method === 'GET') {
        try {
            fs.readFile(
                path.join(__dirname, 'data', 'manga.json'),
                (err, data) => {
                    if (!err) {
                        const jsonData = JSON.parse(data);
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.end(JSON.stringify(jsonData));
                        return res.end();
                    } else {
                        res.writeHead(500, {
                            'Content-Type': 'application/json',
                        });
                        res.end(
                            JSON.stringify({
                                message: 'May be the file is corrupted',
                            })
                        );
                        return res.end();
                    }
                }
            );
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
            return res.end();
        }
    }

    if (req.url === '/products/add' && req.method === 'POST') {
        addNewData(req, res);
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Route Not Found' }));
        return res.end();
    }
});

server.listen(8000, () => {
    console.log('Server Running on port 8000');
});
