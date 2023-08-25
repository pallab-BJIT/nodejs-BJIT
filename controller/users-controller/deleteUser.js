const getQueryParams = require('../../helper/extractQueryParams');
const users = require('../../model/users');
const { failure, success } = require('../../util/common');

const deleteUserById = async (req, res) => {
    try {
        const id = getQueryParams(req).id;
        const result = await users.deleteUser(id);

        if (result.success) {
            if (!result.data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                res.write(failure('Can not delete data with this id'));
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                res.write(
                    success('successfully deleted the data', result.data)
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
                res.write(failure('Cannot delete the data'));
                return res.end();
            }
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(failure('Can not delete the data'));
    }
};

module.exports = deleteUserById;
