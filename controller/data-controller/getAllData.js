const product = require('../../model/product');
const { success, failure } = require('../../util/common');

const getAllData = async (req, res) => {
    try {
        const result = await product.getAll();
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
};

module.exports = getAllData;
