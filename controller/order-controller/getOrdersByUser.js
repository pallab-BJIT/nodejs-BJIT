const getQueryParams = require('../../helper/extractQueryParams');
const orders = require('../../model/orders');
const { failure, success } = require('../../util/common');

const getOrdersByUser = async (req, res) => {
    try {
        const id = getQueryParams(req).user_id;
        const result = await orders.getOrdersByUserId(id);
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
        res.write(failure('Can not get the data '));
        return res.end();
    }
};

module.exports = getOrdersByUser;
