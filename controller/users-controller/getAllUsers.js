const orders = require('../../orders');
const users = require('../../users');
const { success, failure } = require('../../util/common');

const getAllUsers = async (req, res) => {
    try {
        const result = await users.getAllUsers();
        if (result.success) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.write(
                success('successfully get the data', JSON.parse(result.data))
            );
            return res.end();
        } else {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(failure('Cannot get the data')));
            return res.end();
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(failure('Can not get the data '));
        return res.end();
    }
};

module.exports = getAllUsers;
