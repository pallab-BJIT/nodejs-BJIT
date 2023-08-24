const http = require('http');

const { failure, success } = require('./util/common');

const Product = require('./product');
const addToLog = require('./util/logger');
const getAllData = require('./controller/data-controller/getAllData');
const getDataById = require('./controller/data-controller/getDataById');
const createNewData = require('./controller/data-controller/creteData');
const deleteById = require('./controller/data-controller/deleteDataById');

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
            try {
                const id = getQueryParams(req).id;
                const result = await Product.updateById(id, JSON.parse(body));
                addToLog('Update One By Id');

                if (result.success) {
                    if (!result.data) {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure('Can not update data with this id'));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(
                            success(
                                'successfully updated the data',
                                result.data
                            )
                        );
                    }

                    return res.end();
                } else {
                    if (result.message) {
                        res.writeHead(400, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure(result.message));
                        return res.end();
                    } else {
                        res.writeHead(400, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure('Cannot update the data'));
                        return res.end();
                    }
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write(failure('Can not update the data '));
                return res.end();
            }
        } else if (
            requestURL === '/products/sortByPrice' &&
            req.method === 'GET'
        ) {
            try {
                const queryParams = getQueryParams(req)._sort;
                const result = await Product.sortByPrice(queryParams);
                console.log(result.data);
                if (result.success) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.write(
                        success('successfully get the data', result.data)
                    );
                    return res.end();
                } else {
                    res.writeHead(400, {
                        'Content-Type': 'application/json',
                    });
                    res.write(failure('Cannot get the data'));
                    return res.end();
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write(failure('Can not update the data '));
                return res.end();
            }
        } else if (
            requestURL === '/products/sortByStock' &&
            req.method === 'GET'
        ) {
            try {
                const queryParams = getQueryParams(req)._sort;
                const result = await Product.sortByStock(queryParams);
                if (result.success) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.write(
                        success('successfully get the data', result.data)
                    );
                    return res.end();
                } else {
                    res.writeHead(400, {
                        'Content-Type': 'application/json',
                    });
                    res.write(failure('Cannot get the data'));
                    return res.end();
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write(failure('Can not update the data '));
                return res.end();
            }
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
        }
    });
});

server.listen(8000, () => {
    console.log('Server Running on port 8000');
});
