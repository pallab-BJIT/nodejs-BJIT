const getQueryParams = require('../../helper/extractQueryParams');
const product = require('../../model/product');
const { failure, success } = require('../../util/common');

const getDataByNameOrAuthor = async (req, res) => {
    try {
        const queryParams = getQueryParams(req);
        const result = await product.getDataByNameOrAuthor(queryParams);
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
        res.write(failure('Internal server error '));
        return res.end();
    }
};

module.exports = getDataByNameOrAuthor;
