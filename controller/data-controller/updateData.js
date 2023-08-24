const getQueryParams = require('../../helper/extractQueryParams');
const product = require('../../product');
const { failure, success } = require('../../util/common');
const addToLog = require('../../util/logger');

const updateById = async (req, res, body) => {
    try {
        const id = getQueryParams(req).id;
        const result = await product.updateById(id, JSON.parse(body));
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
                    success('successfully updated the data', result.data)
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
};

module.exports = updateById;
