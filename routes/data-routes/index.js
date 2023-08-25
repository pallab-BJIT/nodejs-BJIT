const createNewData = require('../../controller/data-controller/creteData');
const deleteById = require('../../controller/data-controller/deleteDataById');
const getAllData = require('../../controller/data-controller/getAllData');
const getDataById = require('../../controller/data-controller/getDataById');
const getDataByNameOrAuthor = require('../../controller/data-controller/getDataByNameOrAuthor');
const sortDataByPrice = require('../../controller/data-controller/sortDataByPrice');
const sortDataByStock = require('../../controller/data-controller/sortDataByStock');
const updateById = require('../../controller/data-controller/updateData');
const { failure } = require('../../util/common');

const handleDataRoutes = (req, res, body) => {
    const requestURL = req.url.split('?')[0];

    switch (requestURL) {
        case '/products/all':
            if (req.method === 'GET') {
                getAllData(req, res);
            }
            break;

        case '/products/details':
            if (req.method === 'GET') {
                getDataById(req, res);
            }
            break;

        case '/products/create':
            if (req.method === 'POST') {
                createNewData(req, res, body);
            }
            break;

        case '/products/delete':
            if (req.method === 'DELETE') {
                deleteById(req, res);
            }
            break;

        case '/products/update':
            if (req.method === 'PUT') {
                updateById(req, res, body);
            }
            break;

        case '/products/sortByPrice':
            if (req.method === 'GET') {
                sortDataByPrice(req, res);
            }
            break;

        case '/products/sortByStock':
            if (req.method === 'GET') {
                sortDataByStock(req, res);
            }
            break;

        case '/products/findByNameOrAuthor':
            if (req.method === 'GET') {
                getDataByNameOrAuthor(req, res);
            }
            break;

        default:
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
            break;
    }
};

module.exports = handleDataRoutes;
