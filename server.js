const http = require('http');
const addNewData = require('./controllers/data-controller/addData');
const getAllData = require('./controllers/data-controller/getAllData');

const getSingleDataDetails = require('./controllers/data-controller/getSingleData');
const { failure } = require('./util/common');
const deleteSingleFileById = require('./controllers/data-controller/deleteSingleFile');
const updateDataById = require('./controllers/data-controller/updateSingleData');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/products/all') && req.method === 'GET') {
        getAllData(req, res);
    } else if (req.url === '/products/add' && req.method === 'POST') {
        addNewData(req, res);
    } else if (
        req.url.startsWith('/products/getOneById/') &&
        req.method === 'GET'
    ) {
        const parts = req.url.split('/');
        if (parts.length > 4) {
            res.writeHead(400, { 'Content-Type': 'Application/json' });
            res.end(JSON.stringify(failure('Wrong Route')));
        } else {
            getSingleDataDetails(req, res);
        }
    } else if (
        req.url.startsWith('/products/deleteOneById/') &&
        req.method === 'DELETE'
    ) {
        const parts = req.url.split('/');

        if (parts.length > 4) {
            res.writeHead(400, { 'Content-Type': 'Application/json' });
            res.end(JSON.stringify(failure('Wrong Route')));
        } else {
            deleteSingleFileById(req, res);
        }
    } else if (
        req.url.startsWith('/products/updateOneById/') &&
        req.method === 'PUT'
    ) {
        const parts = req.url.split('/');

        if (parts.length > 4) {
            res.writeHead(400, { 'Content-Type': 'Application/json' });
            res.end(JSON.stringify(failure('Wrong Route')));
        } else {
            updateDataById(req, res);
        }
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(failure('Wrong Route')));
    }
});

server.listen(8000, () => {
    console.log('Server Running on port 8000');
});
