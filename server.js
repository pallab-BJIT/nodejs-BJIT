const http = require('http');
const addNewData = require('./controllers/data-controller/addData');
const getAllData = require('./controllers/data-controller/getAllData');

const getSingleDataDetails = require('./controllers/data-controller/getSingleData');
const { failure } = require('./util/common');
const deleteSingleFileById = require('./controllers/data-controller/deleteSingleFile');

const server = http.createServer((req, res) => {
    if (req.url === '/products/all' && req.method === 'GET') {
        getAllData(req, res);
    } else if (req.url === '/products/add' && req.method === 'POST') {
        addNewData(req, res);
    } else if (
        req.url.startsWith('/products/getOneById/') &&
        req.method === 'GET'
    ) {
        getSingleDataDetails(req, res);
    } else if (
        req.url.startsWith('/products/deleteOneById/') &&
        req.method === 'DELETE'
    ) {
        deleteSingleFileById(req, res);
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(failure('Wrong Route')));
    }
});

server.listen(8000, () => {
    console.log('Server Running on port 8000');
});
