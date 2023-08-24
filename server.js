const http = require('http');

const { failure, success } = require('./util/common');

const Product = require('./product');
const addToLog = require('./util/logger');
const getAllData = require('./controller/data-controller/getAllData');
const getDataById = require('./controller/data-controller/getDataById');
const createNewData = require('./controller/data-controller/creteData');
const deleteById = require('./controller/data-controller/deleteDataById');
const updateById = require('./controller/data-controller/updateData');
const sortDataByPrice = require('./controller/data-controller/sortDataByPrice');
const sortDataByStock = require('./controller/data-controller/sortDataByStock');

const getQueryParams = (req) => {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const queryParams = {};
    for (const param of params) {
        queryParams[param[0]] = param[1];
    }
    return queryParams;
};

const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', (buffer) => {
        body += buffer;
    });
    req.on('end', async () => {
        const requestURL = req.url.split('?')[0];
        if (requestURL === '/products/all' && req.method === 'GET') {
            getAllData(req, res);
        } else if (requestURL == '/products/details' && req.method === 'GET') {
            getDataById(req, res);
        } else if (requestURL === '/products/create' && req.method === 'POST') {
            createNewData(req, res, body);
        } else if (
            requestURL === '/products/delete' &&
            req.method === 'DELETE'
        ) {
            deleteById(req, res);
        } else if (requestURL === '/products/update' && req.method === 'PUT') {
            updateById(req, res, body);
        } else if (
            requestURL === '/products/sortByPrice' &&
            req.method === 'GET'
        ) {
            sortDataByPrice(req, res);
        } else if (
            requestURL === '/products/sortByStock' &&
            req.method === 'GET'
        ) {
            sortDataByStock(req, res);
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
        }
    });
});

server.listen(8000, () => {
    console.log('Server Running on port 8000');
});
