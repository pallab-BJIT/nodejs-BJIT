const http = require('http');
const addNewData = require('./controllers/data-controller/addData');
const getAllData = require('./controllers/data-controller/getAllData');

const getSingleDataDetails = require('./controllers/data-controller/getSingleData');
const { failure, success } = require('./util/common');
const deleteSingleFileById = require('./controllers/data-controller/deleteSingleFile');
const updateDataById = require('./controllers/data-controller/updateSingleData');
// const { getAll } = require('./product');
const Product = require('./product');
const { error } = require('console');
const addToLog = require('./util/logger');

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
            try {
                const result = await Product.getAll();
                res.setHeader('Content-Type', 'application/json');
                addToLog('Get all data');
                if (result.success) {
                    res.writeHead(200);
                    res.end(
                        success(
                            'successfully get all the data',
                            JSON.parse(result.data)
                        )
                    );
                } else {
                    res.writeHead(400);
                    res.end(JSON.stringify(failure('Can not get the data')));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(failure('Internal server error ')));
            }
        } else if (requestURL == '/products/details' && req.method === 'GET') {
            try {
                const id = getQueryParams(req).id;
                const result = await Product.getOneById(id);
                addToLog('Get One  By id');

                if (result.success) {
                    if (!result.data) {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure('Can not get data with this id'));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(
                            success('successfully get the data', result.data)
                        );
                    }

                    return res.end();
                } else {
                    if (result.message) {
                        res.writeHead(400, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure(result.message));
                    } else {
                        res.writeHead(400, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure('Can not get the data'));
                    }

                    return res.end();
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write(failure('Internal server error '));
                return res.end();
            }
        } else if (requestURL === '/products/create' && req.method === 'POST') {
            try {
                const result = await Product.add(JSON.parse(body));
                addToLog('Create New Data');
                if (result.success) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.write(
                        success('successfully created the data', result.data)
                    );
                    return res.end();
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(failure('Can not create the data', result.error));
                    return res.end();
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(failure('Can not create the data'));
                return res.end();
            }
        } else if (
            requestURL === '/products/delete' &&
            req.method === 'DELETE'
        ) {
            try {
                const id = getQueryParams(req).id;
                const result = await Product.deleteById(id);
                addToLog('Delete One By Id');

                if (result.success) {
                    if (!result.data) {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(failure('Can not delete data with this id'));
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                        });
                        res.write(
                            success(
                                'successfully deleted the data',
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
                        res.write(failure('Cannot delete the data'));
                        return res.end();
                    }
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(failure('Can not delete the data'));
            }
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
