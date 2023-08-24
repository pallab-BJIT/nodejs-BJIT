const product = require('../../product');
const { success, failure } = require('../../util/common');

const createNewData = async (req, res, body) => {
    try {
        const result = await product.add(JSON.parse(body));
        if (result.success) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.write(success('successfully created the data', result.data));
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
};

module.exports = createNewData;
