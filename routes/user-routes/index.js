const createNewUser = require('../../controller/users-controller/createUser');
const deleteUserById = require('../../controller/users-controller/deleteUser');
const getAllUsers = require('../../controller/users-controller/getAllUsers');
const getUserById = require('../../controller/users-controller/getUserById');
const { failure } = require('../../util/common');

const handleUsersRoutes = (req, res, body) => {
    const requestURL = req.url.split('?')[0];

    switch (requestURL) {
        case '/users/all':
            if (req.method === 'GET') {
                getAllUsers(req, res);
            }
            break;

        case '/users/details':
            if (req.method === 'GET') {
                getUserById(req, res);
            }
            break;

        case '/users/create':
            if (req.method === 'POST') {
                createNewUser(req, res, body);
            }
            break;

        case '/users/delete':
            if (req.method === 'DELETE') {
                deleteUserById(req, res);
            }
            break;

        default:
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(failure('Wrong Route '));
            break;
    }
};

module.exports = handleUsersRoutes;
