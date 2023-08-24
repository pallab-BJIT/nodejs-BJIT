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
            // getAllData(req, res);
            try {
                const result = await Product.getAll();
                res.setHeader('Content-Type', 'application/json');
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
                if (result.success) {
                    console.log(result);
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
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.write(failure('Can not get the data'));
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
                console.log(result);
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
                console.log(result);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(failure('Can not delete the data'));
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
