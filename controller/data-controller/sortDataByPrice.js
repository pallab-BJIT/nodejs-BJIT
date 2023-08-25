const getQueryParams = require('../../helper/extractQueryParams');
const product = require('../../model/product');
const { success, failure } = require('../../util/common');

const sortDataByPrice = async (req, res) => {
    try {
        const queryParams = getQueryParams(req)._sort;
        const result = await product.sortByPrice(queryParams);
        if (result.success) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.write(success('successfully get the data', result.data));
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
        res.write(failure('Can not get the data '));
        return res.end();
    }
};

module.exports = sortDataByPrice;
