const getQueryParams = require('../../helper/extractQueryParams');
const product = require('../../model/product');
const users = require('../../model/users');
const { failure, success } = require('../../util/common');
const addToLog = require('../../util/logger');

const getUserById = async (req, res) => {
    try {
        const id = getQueryParams(req).id;
        const result = await users.getUserById(id);
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
                res.write(success('successfully get the data', result.data));
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
};

module.exports = getUserById;
