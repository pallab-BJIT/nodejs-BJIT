const product = require('../../product');
const users = require('../../users');
const { success, failure } = require('../../util/common');

const createNewUser = async (req, res, body) => {
    try {
        console.log('Create new user');
        const result = await users.createNewUser(JSON.parse(body));
        console.log('create user', result);
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

module.exports = createNewUser;
